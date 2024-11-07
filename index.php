<?php
// Path to the source file on the server
$sourcePath = '/home/kyan/Documents/list.txt';

// Destination directory on the server
$targetDir = 'uploaded_file/';

// Ensure the target directory exists
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0777, true);
}

// Define the target path including the file name
$targetFile = $targetDir . basename($sourcePath);

// Check if the file exists at the source path
if (file_exists($sourcePath)) {
    // Move the file to the target directory
    if (copy($sourcePath, $targetFile)) {
        echo "File has been successfully uploaded to $targetFile";
    } else {
        echo "Error: Could not upload the file.";
    }
} else {
    echo "Error: Source file does not exist.";
}
?>
