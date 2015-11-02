var getCenters = function(hitBoxes, pos) {
  var offset = 0;
  var center = [];
  var left;
  var right;
  var rightSum = 0;
  var leftSum = 0;
  var median = Math.floor(hitBoxes.length/2);
  if(hitBoxes.length%2 === 1) {
    center.push([pos[0], pos[1], hitBoxes[median]]);
    leftSum += hitBoxes[median]/2;
    left = median - 1;
  } else {
    center.push([pos[0] - hitBoxes[median-1]/2, pos[1], hitBoxes[median-1]]);
    center.push([pos[0] + hitBoxes[median]/2 , pos[1], hitBoxes[median]]);
    leftSum += hitBoxes[median-1];
    left = median-2;
  }
  right = median+1;
  rightSum += hitBoxes[median];
  for(var i = right; i < hitBoxes.length; i++) {
    var rightX = pos[0] + rightSum + hitBoxes[i]/2;
    center.push([rightX , pos[1], hitBoxes[i]]);
    rightSum += hitBoxes[i];
  }
  for( var j = left; j > -1; j--) {
    var leftX = pos[0] - leftSum - hitBoxes[j]/2;
    center.push([leftX, pos[1], hitBoxes[j]]);
    leftSum += hitBoxes[j];
  }
  return center;
};

var hitBoxes1 = [1]; // 0
var pos = [0,0];

var hitBoxes2= [1,2,1];//-1.5, 0, 1.5
var hitBoxes3= [1,1];
var hitBoxes4= [2,1];
var hitBoxes5= [1,2,2,3]; //-2.5, -1, 1, 3.5
var hitBoxes6= [3,1,2,3,4,1,2,3]; //-7.5 -5.5 -4 -1.5 2, 4.5, 6, 8.5

console.log( getCenters(hitBoxes1, pos));
console.log(getCenters(hitBoxes2, pos));
console.log( getCenters(hitBoxes3, pos));
console.log( getCenters(hitBoxes4, pos));
console.log( getCenters(hitBoxes5, pos));
console.log( getCenters(hitBoxes6, pos));
