// https://github.com/machow/procrustesjs/blob/master/procrustes.coffee
var ImageRater, createKDTree, numeric;

numeric = require('numeric');

createKDTree = require('static-kdtree');

ImageRater = class ImageRater {
  constructor() {
    this.procrustes = this.procrustes.bind(this);
    null;
  }

  mean(M) {
    var arr, means;
    return means = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = M.length; i < len; i++) {
        arr = M[i];
        results.push((arr.reduce(function(t, s) {
          return t + s;
        })) / arr.length);
      }
      return results;
    })();
  }

  scale(M) {
    var s;
    // there's a bug in this fnc, so norm2 returns the squared L2 norm
    s = Math.sqrt(numeric.norm2(M) / (M[0].length * 2));
    return {
      scaled: numeric.div(M, s),
      s: s
    };
  }

  rotateAlign(src, ref) {
    var N, den, i, ii, num, ref1, theta, w, x, y, z;
    // apply procruste's rotation (minimize SSD)
    N = src[0].length - 1;
    [x, y] = src;
    [w, z] = ref;
    num = den = 0;
    for (ii = i = 0, ref1 = N; i <= ref1; ii = i += 1) {
      num += w[ii] * y[ii] - z[ii] * x[ii];
      den += w[ii] * x[ii] + z[ii] * y[ii];
    }
    //console.log num
    theta = Math.atan(num / den);
    return theta;
  }

  procrustes(src, ref, nIters) {
    var N, add, cycle, den, dtheta, final, i, ii, j, mul, num, ref1, ref2, refMean, refS, refWide, rotMat, srcMean, srcS, srcT, theta, tree, w, x, y, z;
    if (true) {
      src = src.slice();
      ref = ref.slice();
    }
    refMean = this.mean(ref);
    srcMean = this.mean(src);
    src = [numeric.sub(src[0], srcMean[0]), numeric.sub(src[1], srcMean[1])];
    ref = [numeric.sub(ref[0], refMean[0]), numeric.sub(ref[1], refMean[1])];
    ({
      scaled: src,
      s: srcS
    } = this.scale(src));
    ({
      scaled: ref,
      s: refS
    } = this.scale(ref));
    srcT = numeric.transpose(src);
    refWide = numeric.transpose(ref);
    tree = createKDTree(refWide);
    N = src[0].length - 1;
    theta = 0;
    for (cycle = i = 0, ref1 = nIters; i <= ref1; cycle = i += 1) {
      // get new ref based on nearest neighbor
      num = den = 0;
      for (ii = j = 0, ref2 = N; j <= ref2; ii = j += 1) {
        x = src[0][ii];
        y = src[1][ii];
        [w, z] = refWide[tree.nn([x, y])];
        num += x * z - y * w;
        den += x * w + y * z;
      }
      dtheta = Math.atan(num / den);
      rotMat = [[Math.cos(dtheta), -Math.sin(dtheta)], [Math.sin(dtheta), Math.cos(dtheta)]];
      src = numeric.dot(rotMat, src);
      theta += dtheta;
      //{scaled:src, s: srcS} = @scale(src)
      //console.log(srcS)
      console.log(cycle);
    }
    add = numeric.add;
    mul = numeric.mul;
    final = [add(mul(src[0], refS), refMean[0]), add(mul(src[1], refS), refMean[1])];
    return {
      mean: refMean,
      scale: refS,
      rot: rotMat,
      src: src,
      final: final
    };
  }

  longToWide(arr) {
    var i, ii, ref1, results;
    results = [];
    for (ii = i = 0, ref1 = arr[0].length; i <= ref1; ii = i += 1) {
      results.push([arr[0][ii], arr[1][ii]]);
    }
    return results;
  }

};

module.exports = ImageRater;





meanShape=
[
    [25.011254225136952, 34.815173567571549],
    [24.381567267455893, 45.626763203908808],
    [25.830707280728745, 56.164927637057076],
    [28.675368741312013, 66.695735954974964],
    [33.59842962462659, 75.549155778418879],
    [40.332640541597783, 82.561857303541444],
    [48.359309091167063, 87.999836114954576],
    [57.763839129670998, 89.783311477497705],
    [67.090852037871969, 87.63091750236714],
    [74.897176557764965, 81.881107153483129],
    [81.35004130814275, 74.608685557615786],
    [85.920682599877409, 65.568286826736994],
    [88.348489374468954, 54.933637000847114],
    [89.381567267455921, 44.346585170183118],
    [88.326664228593643, 33.56817361245254],
    [81.566856326247773, 27.444862527091914],
    [76.619772918209833, 25.17298033285374],
    [69.153548565650397, 25.746811251285578],
    [63.337202235413088, 27.340674714612589],
    [31.524715699235657, 28.430444822342793],
    [36.378507746326761, 25.965533928582431],
    [43.861536613791145, 26.244938607124027],
    [49.736130518962113, 27.608548456866743],
    [35.982434927065498, 35.443406084328842],
    [41.74296700227427, 32.491136119230305],
    [48.056933854020826, 35.383200094731308],
    [41.827893337283342, 37.01094114500529],
    [41.960848751111143, 34.61071899652552],
    [77.388728098024785, 34.627907207783039],
    [71.516418152976826, 31.904746609209838],
    [65.321222211179702, 35.043179129766543],
    [71.609524186972465, 36.424390535431939],
    [71.382163563407005, 34.031264828125074],
    [56.645668790714296, 33.009120609139984],
    [50.194189402484938, 46.941098052316647],
    [47.456988308925929, 51.770997981023982],
    [50.07251572822895, 55.035267306968535],
    [57.101339593814998, 56.145435575714828],
    [64.081000008569561, 54.759369555253215],
    [66.565969098022094, 51.394645712515057],
    [63.640714233003223, 46.676268118194287],
    [56.826129496946521, 42.171866411747999],
    [52.142251303692888, 53.25579760946124],
    [61.942803190976235, 53.062775282622852],
    [45.090870407180603, 66.45744111296608],
    [49.30691311256561, 63.535961653371373],
    [54.022310354591866, 62.360055474188812],
    [57.235786373192525, 62.971861611246879],
    [60.422680620195308, 62.233999883085119],
    [65.180722218119797, 63.223326242164035],
    [69.508528157121361, 65.976534203943174],
    [66.692952911540658, 69.861040892668086],
    [62.796902525468738, 72.430437387210816],
    [57.438793685614598, 73.279393032509802],
    [52.051412524023078, 72.642070314310331],
    [48.057213957229465, 70.228072641153915],
    [51.312826281003822, 68.334857344858165],
    [57.355342381712035, 69.042220849614353],
    [63.365320267430491, 68.097482913273097],
    [63.302666508653772, 65.1057867536814],
    [57.283082963456252, 65.373307571221233],
    [51.257633954541575, 65.343014232008443],
    [56.997384601005933, 50.86720524009678],
    [38.345016967805378, 33.379866011204456],
    [45.43217757469057, 33.213084051757619],
    [45.102977179460538, 36.387811845290685],
    [38.616928471611573, 36.562115185290565],
    [74.946726694421386, 32.658993629837994],
    [67.858495092410578, 32.771396681549788],
    [68.312444531975871, 35.930700302534717],
    [74.800326543573135, 35.849481471486683]
  ]; //end meanShape



fs = require('fs');
var svm_input
svm_input = fs.readFileSync('../clm_data/clm_data.txt','utf8');
svm_input = JSON.parse(svm_input)

var svm_input_rev = [];
while(svm_input[0][0].length) 
    svm_input_rev.push( svm_input[0][0].splice(0,2) );

var src = svm_input_rev;
var ref = meanShape;
nIters = 100;

var out = procrustes(src, ref, nIters)