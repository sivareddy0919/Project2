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

try {
    // Create a new mysqli connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }
    
    // Get the raw POST data as a string
    $json_data = file_get_contents("php://input");

    // Decode the JSON data into an associative array
    $request_data = json_decode($json_data, true);

    // Extract data from request
    $pname = $request_data['patientName'];
    $mob = $request_data['contactNumber'];
    $mail = $request_data['email'];
    $gender = $request_data['gender'];
    $age = $request_data['age'];
    $bloodgroup = $request_data['bloodGroup'];
    $username = $request_data['username'];
    $pass = $request_data['password'];
    $cpass = $request_data['reenterPassword'];

    // Insert into database
    $sql = "INSERT INTO patsignup (pname, mob, mail, gender, age, bloodgroup, username, pass, cpass)
            VALUES ('$pname', '$mob', '$mail', '$gender', '$age', '$bloodgroup', '$username', '$pass', '$cpass')";

    if ($conn->query($sql) === TRUE) {
        $response['status'] = "success";
        $response['message'] = "Patient signup successful!";
    } else {
        throw new Exception("Error: " . $sql . "<br>" . $conn->error);
    }
} catch(Exception $e) {
    // Database connection error or other exceptions
    $response['status'] = "error";
    $response['message'] = $e->getMessage();
}

// Close the database connection
$conn->close();

// Respond with JSON
echo json_encode($response);
?>
