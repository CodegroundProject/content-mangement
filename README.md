# content-mangement"

get random challenge by categorie
POST http://localhost:5000/api/challenges body: { "categorie": "data-structures" }

don't waste your time 😂
{
"name": "Sort an Array 2",
"level": "hard",
"language": "javascript",
"description": "#Sort an array with javascript",
"func_name": "sortArray",
"categorie": "data-structures",
"inputs": [
{
"input_name": "nums",
"type": "list"
}
],
"output": "list",
"tests": [
{
"weight": 1,
"inputs": [
{
"input_name": "nums",
"value": [
4,
2,
9
]
}
],
"expected": [
2,
4,
9
]
},
{
"weight": 1,
"inputs": [
{
"input_name": "nums",
"value": [
4,
2,
9
]
}
],
"expected": [
2,
4,
9
]
}
]
}
