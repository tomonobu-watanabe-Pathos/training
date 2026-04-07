 // 桁数カウント
 c=0;
        
 // 各種Flag 0:入力可能 1:入力不可
 // Number Flag
 n=0;
 // Symbol Flag
 s=0;
 // Decimal Flag
 d=0;
 // Zero Flag
 z=1;
 //Equation Flag
 e=0;
 // Percentage Flag
 p=0;
 // Square Root Flag
 r=0;
 
 // 内部計算用text
 v='';

 // 値の追加
  function AppendValue(elem){
    if (c>9||n==1){
        ;
        // 初期状態または演算子の後
    } else if (c==0){
        document.getElementById('input').value = elem.value;
        c=1;
        s=0;
        d=0;
        z=0;
    } else {
        document.getElementById('input').value += elem.value;
        c++;
        s=0;
        z=0;
    }
    //document.getElementById('v').value = v;//
}
// 0を押した時の処理
function AppendZero(){
    if (c>9||z==1){
        ;
        // 演算子の後に0を入力した後
    } else if (s==1||c==0){
        document.getElementById('input').value = '0';
        n=0;
        s=0;
        d=0;
        z=1;
    } else {
        document.getElementById('input').value += '0';
        c++;
        n=0;
        s=0;
    }
    //document.getElementById('v').value = v;//
}

function AppendZeroZero(){
    AppendZero();
    AppendZero();
}
// 演算子の追加
function AppendSymbol(elem){
    if (s==0 && e==0){
        CalculateValue();
        v = document.getElementById('input').value + elem.value;
        s=1;
        e=0;
    } else if (s==0 && e==1){
        v = document.getElementById('input').value + elem.value;
        e=0;
        c=0;
        n=0;
        s=1;
        d=0;
        z=0;
        p=0;
    } else if (s==1 && e==0){
        v = v.slice(0, -1) + elem.value;
    }
    //document.getElementById('v').value = v;//
}

// Cを押した時の処理
function ClearValue(){
document.getElementById('input').value = '0';
c=0;
v='';
n=0;
d=0;
s=0;
z=1;
e=0;
p=0;
r=0;
radioDeselection();
//document.getElementById('v').value = v;//
}

 // 計算処理
 function CalculateValue(){
    if (s==1&&String(v).slice(-1)=='/'){
        v='1/' + document.getElementById('input').value;
        result = eval(v);
    } else {
    result = eval(v + document.getElementById('input').value);
}
if (isNaN(result)||result==Infinity||result==-Infinity){
    document.getElementById('input').value = '未定義';
    c=100;
    n=1;
    s=1;
    d=1;
    z=1;
    r=1;
} else if (Math.abs(result)>9999999999){
    document.getElementById('input').value = '(E)'+String(result).slice(0,10)+'...';
    c=String(result).length;
    n=1;
    s=1;
    d=1;
    z=1;
    r=1;
} else if (String(result).includes('.')){
    l= String(result).indexOf('.');
    result = Math.round(result*10000000000)/10000000000;    //丸め込み誤差回避
    document.getElementById('input').value = String(result).slice(0,l+9);
    c=0;
    n=0;
    s=0;
    d=0;
    z=0;
} else {
    document.getElementById('input').value = result;
    c=0;
    n=0;
    s=0;
    d=0;
    z=0;
}

//document.getElementById('v').value = v;//
}

// =を押した時の処理
function PressEqual(){
    CalculateValue();
    e=1;
    radioDeselection();
}
// %を押した時の処理
function PercentageValue(){
    if(p==1){
        ;
    } else if (v==''){
        v='0*';
    } else if (String(v).slice(-1)=='+'||String(v).slice(-1)=='-'){
        document.getElementById('input').value += '*0.01*' + String(v).slice(0,-1);
    } else {
        document.getElementById('input').value = eval(document.getElementById('input').value + '*0.01');
    }
        CalculateValue();
        e=1;
  
    radioDeselection();

}
// .を押した時の処理
function DecimalValue(){
    if (c==0){
        document.getElementById('input').value = '0.';
        c=2;
        n=0;
        s=0;
        d=1;
        z=0;
    } else if (d==0){
        document.getElementById('input').value = document.getElementById('input').value + '.';
        c=2;
        n=0;
        s=0;
        d=1;
        z=0;
    }
    //document.getElementById('v').value = v;//
}

// √を押した時の処理
function SquareRootValue(){
    if(r==1){
        ;
    } else if (document.getElementById('input').value<0){
        document.getElementById('input').value = '複素数だよ';
        c=10;
        n=1;
        s=1;
        d=1;
        z=1;
        p=0;
        r=1;
        radioDeselection();
    } else {
    result = Math.floor(Math.sqrt(document.getElementById('input').value)*10000000000)/10000000000;    //丸め込み誤差回避
    l= String(result).indexOf('.');
    document.getElementById('input').value = String(result).slice(0,l+9);
    c=0;
    n=0;
    s=0;
    d=0;
    z=0;
    e=1;
    radioDeselection();
}
//document.getElementById('v').value = v;//
}
// ±を押した時の処理
function PlusMinusValue(){
    if(document.getElementById('input').value>0){
        document.getElementById('input').value = '-' + document.getElementById('input').value;
    } else if (document.getElementById('input').value<0) {
        document.getElementById('input').value = document.getElementById('input').value.slice(1);
    }
    //document.getElementById('v').value = v;//
}
// CEを押した時の処理
function ClearEntry(){
    if (s==0&&e==0){
    document.getElementById('input').value = '0';
    c=0;
    }
    //document.getElementById('v').value = v;//
}

// ラジオボタンのキャンセル
function radioDeselection() {
    for (const element of document.getElementsByName('symbol')) {
      element.checked = false;
    }
  }
  
  function CopyValue(){
    navigator.clipboard.writeText(document.getElementById('input').value);
  }