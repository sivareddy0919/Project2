<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Database connection details
$servername = "localhost"; // Your database host
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "mobile"; // Your database name

$response = array();

try {
    // Start session
    session_start();

    // Log session ID for debugging
    error_log("Session ID: " . session_id());

    // Check if user is logged in
    if (!isset($_SESSION['user_id'])) {
        throw new Exception("User not logged in");
    }

    // Create a new mysqli connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Log database connection status
    if ($conn->connect_error) {
        error_log("Database connection failed: " . $conn->connect_error);
        throw new Exception("Database connection failed: " . $conn->connect_error);
    } else {
        error_log("Database connected successfully");
    }

    // Get user ID from session
    $user_id = $_SESSION['user_id'];

    // Log user ID
    error_log("User ID: " . $user_id);

    // Fetch user data
    $sql = "SELECT pname, mob, mail, gender, age, bloodgroup FROM patsignup WHERE id = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        error_log("SQL statement preparation failed: " . $conn->error);
        throw new Exception("SQL statement preparation failed: " . $conn->error);
    }

    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // User data found
        $user = $result->fetch_assoc();
        $response['status'] = "success";
        $response['data'] = $user;
    } else {
        error_log("User not found");
        throw new Exception("User not found");
    }

    // Close statement
    $stmt->close();
} catch (Exception $e) {
    // Database connection error or other exceptions
    error_log("Error: " . $e->getMessage());
    $response['status'] = "error";
    $response['message'] = $e->getMessage();
} finally {
    // Close the database connection
    if (isset($conn) && $conn->ping()) {
        $conn->close();
    }
}

// Respond with JSON
echo json_encode($response);
?>
