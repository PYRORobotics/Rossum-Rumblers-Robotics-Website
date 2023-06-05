function Change_text ( text1, text2) {

    if($("h1.Bruh").text() === text1){
        $("h1.Bruh").text( text2 )
    } else {
        $("h1.Bruh").text( text1 )
    }
}

function ARC_POINT(X,Y,R, sANGLE, eANGLE,points) {
    let angle = sANGLE;
    let progress = (eANGLE - sANGLE)/points;
    let Out = []
    for (let i = 0; i < points; i++){
        Out.push(X + (R*Math.cos(angle)),
                 Y + (R*Math.sin(angle))
            );
        angle += progress;
        if(angle >= eANGLE) {
            return Out;
        }
    }
}
