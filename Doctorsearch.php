<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Database connection details
$servername = "localhost"; // Your database host
$username = "root"; // Your database username
$password = ""; // Your database password
$database = "mobile"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        "status" => "error",
        "message" => "Connection failed: " . $conn->connect_error
    ]));
}

// Initialize response array
$response = array();

// Get the raw POST data as a string
$json_data = file_get_contents("php://input");

// Decode the JSON data into an associative array
$request_data = json_decode($json_data, true);

// Check if 'username' key exists in $request_data
if (isset($request_data['username'])) {
    // Get the username from the decoded JSON data
    $searchText = $request_data['username'];

    // Query to search for patients based on name
    $sql = "SELECT * FROM patsignup WHERE `username` LIKE ?"; // Assuming 'username' is the column name for patient names
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        $response['status'] = "error";
        $response['message'] = "Database error: " . $conn->error;
    } else {
        // Bind parameter
        $searchText = '%' . $searchText . '%'; // Add wildcard for partial matching
        $stmt->bind_param('s', $searchText);

        // Execute the prepared statement
        if (!$stmt->execute()) {
            $response['status'] = "error";
            $response['message'] = "Execution error: " . $stmt->error;
        } else {
            $result = $stmt->get_result();

            // Check if search returned any results
            if ($result->num_rows > 0) {
                $patients = $result->fetch_all(MYSQLI_ASSOC);
                $response['status'] = "success";
                $response['message'] = "Search successful";
                $response['patients'] = $patients; // Include search results in the response
            } else {
                $response['status'] = "error";
                $response['message'] = "No patients found";
            }
        }

        // Close the prepared statement
        $stmt->close();
    }
} else {
    // Handle the case where 'username' is missing
    $response['status'] = "error";
    $response['message'] = "Invalid request data";
}

// Close the database connection
$conn->close();

// Respond with JSON
echo json_encode($response);
?>
