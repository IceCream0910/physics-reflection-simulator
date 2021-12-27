$("#angle_range").val(0)
$("#angle_number").val(0)
$("#refractive_a").val(1)
$("#refractive_b").val(2)

$("#angle_range").on('input', e => {
    $("#angle_number").val(e.target.value)
    control.angle = e.target.value
    
})

$("#angle_number").change(e => {
    $("#angle_range").val(e.target.value)
    control.angle = e.target.value
})

$("#refractive_a").change(e => {
    control.refractive_a = e.target.value
    control.refractive = control.refractive_b / control.refractive_a
})

$("#refractive_b").change(e => {
    control.refractive_b = e.target.value
    control.refractive = control.refractive_b / control.refractive_a
})


let canvas = new p5(sketch, "canvas");