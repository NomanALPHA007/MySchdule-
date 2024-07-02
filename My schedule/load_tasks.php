<?php
include './db_connect.php';

$sql = "SELECT * FROM tasks ORDER BY created_at DESC";
$result = $conn->query($sql);

$output = '';
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $output .= '
        <li class="list-group-item">
            <strong>' . $row['name'] . '</strong> - ' . $row['description'] . '
            <span class="badge badge-primary">' . $row['date'] . ' ' . $row['time'] . '</span>
            <button class="btn btn-danger btn-sm float-right delete" data-id="' . $row['id'] . '">Delete</button>
        </li>
        ';
    }
} else {
    $output .= '<li class="list-group-item">No tasks found</li>';
}

echo $output;

$conn->close();
?>
<!-- // done -->