function addDecimalSeparators(cents){
	var arr = cents.toString().split("");
	arr.splice(arr.length-2,0,".");

	var withComma = arr.join("");
	var splitByComma = withComma.split(".");
	splitByComma[0] = addSpaces(splitByComma[0]);
	return splitByComma.join(".");
}

function addSpaces(number){
	var arr = number.toString().split("");
	for (var i = arr.length - 3; i > 1; i -= 3){
		arr[i] = " " + arr[i];
	}
	return arr.join("");
}
