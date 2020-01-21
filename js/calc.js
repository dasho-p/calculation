"use strict";

var perevirka_poperednoi_dis_na_rivre = false;
var resultat = [];
var poperednia_operation = "";
var poperednia_operation_result_out = "";
var radio_checked = true;
var count_brakets_open = 0;
var count_brakets_close = 0;

function Number(n){
  var res = document.getElementById('result').value;
  if(window.poperednia_operation === "k" && window.resultat[window.resultat.length-1] !== "("){
    document.getElementById("result").value = "";
    document.getElementById("result_out").value = "";
    document.getElementById("result_error").value = "";
    window.resultat = [];
    window.poperednia_operation = "";
  }
  if(window.perevirka_poperednoi_dis_na_rivre === true){
    document.getElementById('result').value = "";
    document.getElementById('result_error').value = "";
    document.getElementById('result_out').value = "";
    window.resultat = [];
    window.perevirka_poperednoi_dis_na_rivre = false;
  }
  if(res==="0"){
    document.getElementById('result').value = "";
  }
  document.getElementById('result').value += n;
}
function znak(){
  var res = +document.getElementById('result').value;
  if(res > 0 || res < 0){
    res *= -1;
  } else if(res.length === 0){
    res = 0;
  }
  document.getElementById('result').value = res;
}
function pointer(){
  var result = document.getElementById("result").value;
  if(result === ""){
    result += "0.";
  }else if(result.indexOf(".") === -1){
    result += ".";
  }
  document.getElementById("result").value = result;
}
function operation(i_oper){
  var oper = ["%","*","/","+","-","^","√"];
  var result = document.getElementById('result').value;
  var leng = document.getElementById('result').value.length;
  var res_out = document.getElementById("result_out").value;
  var resultat_f = window.resultat;

  if(leng !== 0 || res_out.length !== 0 && window.resultat[window.resultat.length-1] !== "("){
    if(window.poperednia_operation !== "k"){
      var count = 0;
      for(var i = 0; i< oper.length;i++){
        if(res_out.length > 0 && oper[i] === window.resultat[window.resultat.length-1] &&
        window.resultat[window.resultat.length-1] !== "(" && result === "") {
          window.resultat.pop();
          window.resultat.push(oper[i_oper]);
          res_out = res_out.substr(0, res_out.length-2) + oper[i_oper] + " ";
          document.getElementById("result_out").value = res_out;
          break;
        } else if(result[leng-1] !== oper[i] && document.getElementById("result_out").value !== ""
        || result[leng-1] !== oper[i] && leng !== ""){
          count++;
        }
      }
      if(count === oper.length){
        if(window.resultat[window.resultat.length-1] === ")"){
          window.resultat.push(oper[+i_oper]) ;
        } else {
          window.resultat.push(+result, oper[+i_oper]) ;
        }
        result += " " + oper[+i_oper] + " ";
      }
      document.getElementById('result_out').value += result;
      limitDisplay();
      document.getElementById('result').value = "";
    }else{
      window.resultat.push(oper[+i_oper]);
      document.getElementById('result_out').value += " " + oper[+i_oper] + " ";
      document.getElementById('result').value = "";
      window.poperednia_operation = "";
      window.poperednia_operation_result_out = "";
    }
  }
  perevirka_poperednoi_dis_na_rivre = false;
}
function operation_x(i_oper){
  var res_out = document.getElementById("result_out").value;
  var res = document.getElementById("result").value;
  function pepevirkaPoperednoiOperationNa_K(){
    if(window.poperednia_operation === "k" && window.resultat[window.resultat.length-1] !== "("){
      window.resultat.pop();
      document.getElementById("result_out").value = "";
    }
  }
  if(i_oper === 0 && res.length !== 0){
    pepevirkaPoperednoiOperationNa_K();
    document.getElementById("result_out").value += "sqrt(" + res + ") ";
    if( +res >= 0 ){
      window.poperednia_operation_result_out = "sqrt(" + res + ") ";
      res = Math.sqrt(+res);
      document.getElementById("result").value = res;
      window.resultat.push(res);
    }else{
      errors("Корінь із відємного числа не добувається!!!");
    }
    window.poperednia_operation = "k";
  }
  if(i_oper === 1 && res.length !== 0){
    pepevirkaPoperednoiOperationNa_K();
    document.getElementById("result_out").value += "fact(" + res + ") ";
    if( +res >= 0 ){
      if( +res > 170 ){
        errors("Введіть менше значення!!!");
      }else {
        window.poperednia_operation_result_out = "fact(" + res + ") ";
        res = factorial(+res);
        document.getElementById("result").value = res;
        window.resultat.push(res);
      }
    }else{
      errors("Факторіал не береться із відємного числа!!!");
    }
    window.poperednia_operation = "k";
  }
  if(i_oper === 2 && res.length !== 0){
    pepevirkaPoperednoiOperationNa_K();
    document.getElementById("result_out").value += "sqr(" + res + ") ";
    window.poperednia_operation_result_out = "sqr(" + res + ") ";
    res = Math.pow(+res,2);
    document.getElementById("result").value = res;
    window.resultat.push(res);
    window.poperednia_operation = "k";
  }
  if(i_oper === 3 && res.length !== 0){
    pepevirkaPoperednoiOperationNa_K();
    document.getElementById("result_out").value += "cube(" + res + ") ";
    window.poperednia_operation_result_out = "cube(" + res + ") ";
    res = Math.pow(+res,3);
    document.getElementById("result").value = res;
    window.resultat.push(res);
    window.poperednia_operation = "k";
  }
  if(i_oper === 4 && res.length !== 0){
    pepevirkaPoperednoiOperationNa_K();
    document.getElementById("result_out").value += "cuberoot(" + res + ") ";
    if( +res >= 0 ){
      window.poperednia_operation_result_out = "cuberoot(" + res + ") ";
      res = Math.pow(+res,(1/3));
      document.getElementById("result").value = res;
      window.resultat.push(res);
    }else{
      errors("Корінь із відємного числа не добувається!!!");
    }
    window.poperednia_operation = "k";
  }
  if(i_oper === 5 && res.length !== 0){
    pepevirkaPoperednoiOperationNa_K();
    document.getElementById("result_out").value += "ln(" + res + ") ";
    if( +res > 0 ){
      window.poperednia_operation_result_out = "ln(" + res + ") ";
      res = Math.log(+res);
      document.getElementById("result").value = res;
      window.resultat.push(res);
    }else{
      errors("Логарафм із "+ res +" не береться!!!");
    }
    window.poperednia_operation = "k";
  }
  if(i_oper === 6 && res.length !== 0){
    pepevirkaPoperednoiOperationNa_K();
    document.getElementById("result_out").value += "log(" + res + ") ";
    if( +res > 0 ){
      window.poperednia_operation_result_out = "log(" + res + ") ";
      res = Math.log10(+res);
      document.getElementById("result").value = res;
      window.resultat.push(res);
    }else{
      errors("Логарафм із "+ res +" не береться!!!");
    }
    window.poperednia_operation = "k";
  }
  if(i_oper === 7 && window.poperednia_operation !== "k"){
    pepevirkaPoperednoiOperationNa_K();
    window.poperednia_operation_result_out = res;
    res = Math.PI;
    document.getElementById("result").value = res;
  }
  if(i_oper === 8 && res.length !== 0){
    if(window.poperednia_operation === "k"){
      var leng_poperednia_oreration = window.poperednia_operation_result_out.length;
      res_out = res_out.substr(0, res_out.length - leng_poperednia_oreration);
      document.getElementById("result_out").value = res_out + "int(" + res + ") ";
      window.poperednia_operation_result_out = "int(" + res + ") ";
      window.resultat.pop();
      res = Math.floor(+res);
      window.resultat.push(res);
      document.getElementById("result").value = res;
    }else if(+res !== 0){
      document.getElementById("result_out").value += " int(" + res + ") ";
      res = Math.floor(+res);
      window.resultat.push(res);
      document.getElementById("result").value = "";
    }
    limitDisplay();
    window.poperednia_operation = "k";
  }
  if(i_oper === 9 && res.length !== 0){
    pepevirkaPoperednoiOperationNa_K();
    if( window.radio_checked === true){
      document.getElementById("result_out").value += "sind(" + res + ") ";
      window.poperednia_operation_result_out = "sind(" + res + ") ";
      res = Math.sin(+res * (Math.PI)/180);
      document.getElementById("result").value = res;
      window.resultat.push(res);
    }else if(window.radio_checked === false){
      document.getElementById("result_out").value += "sinr(" + res + ") ";
      window.poperednia_operation_result_out = "sinr(" + res + ") ";
      res = Math.sin(+res);
      document.getElementById("result").value = res;
      window.resultat.push(res);
    }
    window.poperednia_operation = "k";
  }
  if(i_oper === 10 && res.length !== 0){
    pepevirkaPoperednoiOperationNa_K();
    document.getElementById("result_out").value += "sinh(" + res + ") ";
    window.poperednia_operation_result_out = "sinh(" + res + ") ";
    res = Math.sinh(+res);
    document.getElementById("result").value = res;
    window.resultat.push(res);
    window.poperednia_operation = "k";
  }
  if(i_oper === 11 && res.length !== 0){
    pepevirkaPoperednoiOperationNa_K();
    if( window.radio_checked === true){
      document.getElementById("result_out").value += "cosd(" + res + ") ";
      window.poperednia_operation_result_out = "cosd(" + res + ") ";
      res = Math.cos(+res * (Math.PI)/180);
      document.getElementById("result").value = res;
      window.resultat.push(res);
    }else if(window.radio_checked === false){
      document.getElementById("result_out").value += "cosr(" + res + ") ";
      window.poperednia_operation_result_out = "cosr(" + res + ") ";
      res = Math.cos(+res);
      document.getElementById("result").value = res;
      window.resultat.push(res);
    }
    window.poperednia_operation = "k";
  }
  if(i_oper === 12 && res.length !== 0){
    pepevirkaPoperednoiOperationNa_K();
    document.getElementById("result_out").value += "cosh(" + res + ") ";
    window.poperednia_operation_result_out = "cosh(" + res + ") ";
    res = Math.cosh(+res);
    document.getElementById("result").value = res;
    window.resultat.push(res);
    window.poperednia_operation = "k";
  }
  if(i_oper === 13 && res.length !== 0){
    pepevirkaPoperednoiOperationNa_K();
    if( window.radio_checked === true){
      if(+document.getElementById("result").value !== 90 && +document.getElementById("result").value !== 270){
        document.getElementById("result_out").value += "tand(" + res + ") ";
        window.poperednia_operation_result_out = "tand(" + res + ") ";
        res = Math.tan(+res * (Math.PI)/180);
        document.getElementById("result").value = res;
        window.resultat.push(res);
    } else {
      errors("Тангенс із " + document.getElementById("result").value + " градусів не береться!!!!");
    }
    }else if(window.radio_checked === false){
      document.getElementById("result_out").value += "tanr(" + res + ") ";
      window.poperednia_operation_result_out = "tanr(" + res + ") ";
      res = Math.tan(+res);
      document.getElementById("result").value = res;
      window.resultat.push(res);
    }
    window.poperednia_operation = "k";
  }
  if(i_oper === 14 && res.length !== 0){
    pepevirkaPoperednoiOperationNa_K();
    document.getElementById("result_out").value += "tanh(" + res + ") ";
    window.poperednia_operation_result_out = "tanh(" + res + ") ";
    res = Math.tanh(+res);
    document.getElementById("result").value = res;
    window.resultat.push(res);
    window.poperednia_operation = "k";
  }
  limitDisplay();
}
function operation_rivne(){
  if(window.poperednia_operation !== "k" && document.getElementById("result").value !== ""){
    window.resultat.push(+document.getElementById("result").value);
  }
  var res_oper = "";
  var res_leng = window.resultat.length;
  var arrResult = window.resultat;

  if(arrResult[arrResult.length-1] === "%" || arrResult[arrResult.length-1] === "*" || arrResult[arrResult.length-1] ==="/" || arrResult[arrResult.length-1] === "+" || arrResult[arrResult.length-1] ==="-" || arrResult[arrResult.length-1] === "√"){
    arrResult.pop();
  }
  if(window.count_brakets_open - window.count_brakets_close > 0){
    for(var k = 0; k < window.count_brakets_open - window.count_brakets_close; k++){
      arrResult.push(")");
    }
  }
  var provisional_result = [];
  var result_function;
  if(window.count_brakets_open > 0){
    for(var i = arrResult.length - 1 ; i >= 0; i--){
      if(arrResult[i] === "("){
        for(; ; ){
          provisional_result.push(arrResult[i]);
          if(arrResult[i] === ")"){
            provisional_result.pop();
            provisional_result.shift();
            if(provisional_result.length > 0){
              result_function = rivno_operation(provisional_result);
              if(result_function === "error"){
                return 0;
              }
            }
            arrResult.splice(i, 1, result_function);
            break;
          }
          arrResult.splice(i, 1);
        }
      }
      provisional_result = [];
    }
  }

  if(rivno_operation(arrResult) === "error"){
    return 0;
  } else{
    rivno_operation(arrResult);
  }
  errors("");
  document.getElementById("result").value = arrResult;
  document.getElementById("result_out").value = "";
  return arrResult;
}
function rivno_operation(arrResult){
  var oper = ["^","√","%","*","/"];
  var zmina;
  for(var i = 0; i < oper.length; i++){
    for(var j = 0; j< arrResult.length;j++){
      if(arrResult[j] === "^" && oper[i] === "^"){
        zmina = Math.pow(+arrResult[j-1], +arrResult[j+1]);
        arrResult.splice(j-1,3,zmina);
        j = 0;
      }if(arrResult[j] === "√" && oper[i] === "√"){
        if(+arrResult[j-1] >= 0){
          zmina = Math.pow(+arrResult[j-1], 1/(+arrResult[j+1]));
          arrResult.splice(j-1,3,zmina);
          j = 0;
        } else{
          document.getElementById("result_out").value += document.getElementById("result").value;
          errors("Корінь із відємного числа не добувається!!!!");
          return "error";
        }
      } else if(arrResult[j] === "%" && oper[i] === "%"){
        if(+arrResult[j+1] === 0){
          document.getElementById("result_out").value += document.getElementById("result").value;
          errors("Остачу від ділення на 0 не можна брати!!)");
          return "error";
        }
        zmina = +arrResult[j-1] % +arrResult[j+1];
        arrResult.splice(j-1,3,zmina);
        j = 0;
      }else if(arrResult[j] === "*" && oper[i] === "*"){
        zmina = +arrResult[j-1] * +arrResult[j+1];
        arrResult.splice(j-1,3,zmina);
        j = 0;
      }else if(arrResult[j] === "/" && oper[i] === "/"){
        if(+arrResult[j+1] === 0){
          document.getElementById("result_out").value += document.getElementById("result").value;
          errors("Ділення на 0 заборонено!!!");
          return "error";
        }
        zmina = +arrResult[j-1] / +arrResult[j+1];
        arrResult.splice(j-1,3,zmina);
        j = 0;
      }
    }
  }
  for(i=0; i<arrResult.length; i++){
    if(arrResult[i] === "+"){
      zmina = +arrResult[i-1] + arrResult[i+1];
      arrResult.splice(i-1,3,zmina);
      i = 0;
    }
    if(arrResult[i] === "-"){
      zmina = +arrResult[i-1] - +arrResult[i+1];
      arrResult.splice(i-1,3,zmina);
      i = 0;
    }
  }
  return arrResult[0];
}
function limitDisplay(){
  var res_Out = document.getElementById("result_out").value;
  if(res_Out.length > 60){
    res_Out = "..." + res_Out.substr(res_Out.length - 60, res_Out.length);
    document.getElementById("result_out").value = res_Out;
  }
  return document.getElementById("result_out").value;
}
function numOnly(evt){
  evt = (evt) ? evt : event;
  var elem = (evt.target) ? evt.target : evt.srcElement;
  var code = (evt.charCode) ? evt.charCode : evt.keyCode;
  if(code > 31 && (code < 45 || code > 57) && code != 37 && code != 94 && code != 40 && code != 41 && code != 42 && code != 43 && code != 13){
    elem.focus();
    return false;
  }
  if(code === 13){
    operation_rivne();
  }
  return true;
}
function CE(num){
  if(num === 1){
    document.getElementById("result").value = "";
  }
  if(num === 0){
    errors("");
    document.getElementById("result_out").value = "";
    window.perevirka_poperednoi_dis_na_rivre = false;
  }
}
function Blackspace(){
  var res = document.getElementById("result").value;
  res = res.substr(0, res.length-1);
  document.getElementById("result").value = res;
}
function factorial(n){
  var result = 1;
  if(n===0 || n === 1){
    return 1;
  }else{
    for(var i = 1; i < n; i++){
      result = result * i;
    }
  }
  return result;
}
function radio_gra(number){
  if(number === 1){
    window.radio_checked = true;
  }else if(number === 2){
    window.radio_checked = false;
  }
  return window.radio_checked;
}
function brakets(number_brakets){
  var operation_pered_close = ["%","√","^","*","/","+","-"];
  var count = 0;

  if(number_brakets === 0){
    for(var j = 0; j < operation_pered_close.length; j++){
      if(window.resultat[window.resultat.length - 1] === operation_pered_close[j]){
        count++;
      }
    }
    if(count === 0 && document.getElementById("result_out").value !== "" &&                   window.resultat[window.resultat.length-1] !== "("){
      window.resultat.push("*");
      document.getElementById("result_out").value += "*";
    }
    document.getElementById("result_out").value += "(";
    window.resultat.push("(");
    window.count_brakets_open++;

    if(window.poperednia_operation === "k"){
      window.poperednia_operation = "";
      document.getElementById("result").value = "";
    }
  } else if(number_brakets === 1 && window.count_brakets_open > window.count_brakets_close){
    for(var i = 0; i < operation_pered_close.length; i++){
      if(window.resultat[window.resultat.length - 1] === operation_pered_close[i]){
          count++;
      }
    }
    if(count === 0){
      if(document.getElementById("result").value.length !== ""){
        window.resultat.push(+document.getElementById("result").value);
        document.getElementById("result_out").value += document.getElementById("result").value;
      }
      window.count_brakets_close++;
      document.getElementById("result_out").value += ")";
      window.resultat.push(")");
    }else if(count !== 0 && document.getElementById("result").value !== ""){
      window.count_brakets_close++;
      document.getElementById("result_out").value += document.getElementById("result").value + ")";
      window.resultat.push(+document.getElementById("result").value, ")");
    }
    document.getElementById("result").value = "";
  }
  limitDisplay();
}
function errors(message){
  document.getElementById("result").value = "";
  document.getElementById("result_error").value = message;
  window.resultat = [];
  window.perevirka_poperednoi_dis_na_rivre = true;
  window.poperednia_operation = "";
  window.poperednia_operation_result_out = "";
  window.count_brakets_open = 0;
  window.count_brakets_close = 0;
}
