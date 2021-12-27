let control = {
    angle: 0,
    refractive_a: 1,
    refractive_b: 2,
    refractive: 2
}

let result = {
    incidence_angle: 0,
    refraction_angle: 0
}

const angleToLocationInflection = (angle) => {
    let _angle = angle * control.refractive

    if (_angle < 45) {
        return [200+Math.round(_angle*100/180)*8, 0]
    } else if (_angle <= 90) {
        return [400, Math.round(_angle*100/180)*8-200]
    } else {
        return [200,200]
    }

    // if (_angle < 45) {
    //     return [200+Math.round(_angle*100/180)*8, 0]
    // } else if (_angle < 135) {
    //     return [400, Math.round(_angle*100/180)*8-200]
    // } else {
    //     return [1000-Math.round(_angle*100/180)*8, 400]
    // }
}

const angleToLocationReflection = (angle) => {
    let _angle = 180-angle

    if (_angle < 45) {
        return [200+Math.round(_angle*100/180)*8, 0]
    } else if (_angle < 135) {
        return [400, Math.round(_angle*100/180)*8-200]
    } else {
        return [1000-Math.round(_angle*100/180)*8, 400]
    }
}

let sketch = function (p) {
    p.preload = function () {

    }

    p.setup = function () {
        p.createCanvas(400, 400);
        p.background("#F2F3F8");
        p.stroke(0)
    }

    p.draw = function () {
        p.background("#F2F3F8");
        p.strokeWeight(0);
        p.fill('#DBDDEB')
        p.rect(0, 200, 400, 400);
        p.strokeWeight(2);
        p.stroke("rgba(0,0,0,0.3)");
        p.line(200, 0, 200, 400)

        p.textSize(32)
        p.text('a', 30, 50);
        p.text('b', 30, 250);

        // 입사 광선
        p.stroke("#ff0000");
        if (control.angle < 45) {
            p.line(200-Math.round(control.angle*100/180)*8, 400, 200, 200)
        } else {
            p.line(0, 600-Math.round(control.angle*100/180)*8, 200, 200)
        }

        // 굴절 광선
        p.stroke("#00ff00");
        p.line(200, 200, ...angleToLocationInflection(control.angle))

        // 반사 광선
        p.stroke("#0000ff");
        p.line(200, 200, ...angleToLocationReflection(control.angle))
    
        $("#result").html(`입사각: ${control.angle}° 반사각: ${control.angle}° 굴절각: ${control.angle*control.refractive <= 90 ? control.angle*control.refractive : "-" }°`)
    }
};