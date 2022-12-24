let control = {
    angle: 30,
    refractive_a: 1,
    refractive_b: 1.33,
    refractive: 1
}

let result = {
    incidence_angle: 0,
    refraction_angle: 0
}

var backgroundColor, backgroundColor2, textColor;
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    backgroundColor2 = "#1E1E1E";
    backgroundColor = "#303030";
    textColor = "rgba(238, 238, 238, 0.3)"
} else {
    backgroundColor2 = "#F2F3F8";
    backgroundColor = "#DBDDEB";
    textColor = "rgba(169, 169, 169, 0.3)"
}

const angleToLocation = (angle) => {
    return Math.round(Math.asin(Math.sin((Math.PI / 180) * angle) * control.refractive) * 10 / Math.PI * 180) / 10
}

const angleToLocationInflection = (angle) => {
    if (angle < 45) {
        return [200 + Math.round(angle * 100 / 180) * 8, 0]
    } else if (angle <= 90) {
        return [400, Math.round(angle * 100 / 180) * 8 - 200]
    } else {
        return [200, 200]
    }
}

const angleToLocationReflection = (angle) => {
    let _angle = 180 - angle

    if (_angle < 45) {
        return [200 + Math.round(_angle * 100 / 180) * 8, 0]
    } else if (_angle < 135) {
        return [400, Math.round(_angle * 100 / 180) * 8 - 200]
    } else {
        return [1000 - Math.round(_angle * 100 / 180) * 8, 400]
    }
}

let sketch = function (p) {
    p.preload = function () {

    }

    p.setup = function () {
        p.createCanvas(400, 400);
        p.background(backgroundColor);
        p.stroke(0)
        p.frameRate(30)
    }

    p.draw = function () {
        p.background(backgroundColor);
        p.strokeWeight(0);
        p.fill(backgroundColor2)
        p.rect(0, 200, 400, 400);
        p.strokeWeight(2);
        p.stroke(textColor);
        p.line(200, 0, 200, 400)

        p.textSize(32)
        p.text('a', 30, 50);
        p.text('b', 30, 250);

        // 입사 광선
        p.stroke("#ff0000");
        if (control.angle < 45) {
            p.line(200 - Math.round(control.angle * 100 / 180) * 8, 400, 200, 200)
        } else {
            p.line(0, 600 - Math.round(control.angle * 100 / 180) * 8, 200, 200)
        }

        // 굴절 광선
        let angleToLocationValue = angleToLocation(control.angle)
        p.stroke("#00ff00");
        p.line(200, 200, ...angleToLocationInflection(angleToLocationValue))

        // 반사 광선
        p.stroke("#0000ff");
        p.line(200, 200, ...angleToLocationReflection(control.angle))

        $("#result").html(`입사각: ${control.angle}° 반사각: ${control.angle}° 굴절각: ${angleToLocationValue <= 90 ? angleToLocationValue : "-"}°`)
    }
};