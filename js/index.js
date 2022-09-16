// Created by 🧚Somya🌹

window.onload = () =>{
    let c = document.getElementById("canvas")
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    let ctx = c.getContext("2d");
    let undo = document.getElementById("undo")
    let btn1 = document.getElementById("btn1")
    let btn2 = document.getElementById("btn2")
    let btn3 = document.getElementById("btn3")
    let colorPicker = document.getElementById("color_picker")
    let cr = document.getElementById("cr")
    let inp = document.getElementById("inp")
    let clear = document.getElementById("clear")
    let eraser = document.getElementById("eraser")
    let bg_colour = document.getElementById("bg_color")
    let add_text = document.getElementById("add_text")
    let draw_brush = document.getElementById("draw_brush")
    let bg_effect = document.getElementById("bg_effect")
    let pen = document.getElementById("pen")
    let bgc_picker = document.getElementById("bgc_picker")
    let text_index = !1
    let size = 5
    let color = "lime"
    let undoArray = []
    let index = -1
    let isEraser = !0
    let particles = []
    let erase = !1
    let is_draw = !0
    let bg_index = -1
    const drawPosition = () =>{
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = size
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.moveTo(m.x,m.y)
        ctx.lineTo(m.x,m.y)
        ctx.stroke()
    }
    const startDrawing = () =>{
        ctx.lineTo(m.x,m.y)
        ctx.stroke()
    }
    const m = {
        x: NaN,
        y: NaN
    }
    const btnAnim = (ref) =>{
        ref.classList.add('active');
        setTimeout(()=>{
            ref.classList.remove('active');
        },600);
    }
    const randomNumber = (max,min) => {
        return (Math.floor(Math.random() * (max-min)+min))
    }
    const randomColor = () => {
        let r = randomNumber(255,0)
        let g = randomNumber(255,0)
        let b = randomNumber(255,0)
        return "rgb("+(r+","+g+","+b)+")"
    }
    c.ontouchstart = e =>{
    if(erase){
        ctx.globalCompositeOperation = "destination-out"
        m.x = e.touches[0].clientX
        m.y = e.touches[0].clientY
        drawPosition()
    }
    else{
        m.x = e.touches[0].clientX
        m.y = e.touches[0].clientY
        if(is_draw) {
            ctx.globalCompositeOperation = "source-over"
            drawPosition()
        }
        }
    }
    c.ontouchmove = e =>{
    if(erase){
        ctx.globalCompositeOperation = "destination-out"
        m.x = e.touches[0].clientX
        m.y = e.touches[0].clientY
        startDrawing()
    }
    else{
        m.x = e.touches[0].clientX
        m.y = e.touches[0].clientY
        if(is_draw){
            ctx.globalCompositeOperation = "source-over"
            startDrawing()
        }
        }
    }
    c.ontouchend = () =>{
        undoArray.push(ctx.getImageData(0,0,c.width,c.height))
        index++
    }
    
    
    clear.onclick = () => {
        btnAnim(clear)
        is_draw = !0
        erase = !1
        ctx.clearRect(0,0,c.width,c.height)
        bg_index = -1
        bg_effect.textContent = "BG EFFECT"
    }
    btn1.onclick = () => {
        color = window.getComputedStyle(btn1).getPropertyValue("background-color")
        btnAnim(btn1)
        is_draw = !0
        erase = !1
        pen.textContent = "PEN SIZE"
    }
    btn2.onclick = () => {
        color = window.getComputedStyle(btn2).getPropertyValue("background-color")
        btnAnim(btn2)
        is_draw = !0
        erase = !1
        pen.textContent = "PEN SIZE"
    }
    btn3.onclick = () => {
        color = window.getComputedStyle(btn3).getPropertyValue("background-color")
        btnAnim(btn3)
        is_draw = !0
        erase = !1
        pen.textContent = "PEN SIZE"
    }
    cr.oninput = () =>{
        color = cr.value
    }
    bgc_picker.oninput = () =>{
        c.style.backgroundColor = bgc_picker.value
    }
    inp.onchange = () =>{
        size = inp.value
    }
    eraser.onclick = () =>{
        erase = !0
        is_draw = !1
        btnAnim(eraser)
        pen.textContent = "ERASER SIZE"
    }
    bg_colour.onclick = () =>{ 
        btnAnim(bg_colour)
        bgc_picker.click()
        
    }
    undo.onclick = () => {
        btnAnim(undo)
        if(index<=0){
            ctx.clearRect(0,0,c.width,c.height)
        }else{
        index--
        undoArray.pop()
        ctx.putImageData(undoArray[index],0,0)
        }
    }
    draw_brush.onclick = () =>{
        btnAnim(draw_brush)
        is_draw = !0
        erase = !1
        pen.textContent = "PEN SIZE"
    }
    bg_effect.onclick = () => {
        btnAnim(bg_effect)
        backgroundEffect()
        if(bg_effect.textContent == "DISABLED"){
            swal("clear the canvas to enable it")
        }
        bg_index++
    }
    colorPicker.onclick = () =>{
        cr.click()
    }
    add_text.onclick = () =>{
        btnAnim(add_text)
        text_index+=50
        swal({
        content: {
        element: "input",
        attributes: {
        placeholder: "Enter your text",
        },
      },
    })
    .then((your_text) => {
        if(your_text == null || your_text == ""){
            text_index = !1
            your_text = ""
        }
        createTextContainer(your_text)
        });
    }
    const createTextContainer = (text_node) =>{
        ctx.font="40px Comic Sans MS";
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.fillText(text_node,c.width/2,(50)+text_index);
    }
    const backgroundEffect = () => {
        if(bg_index <= 2){
            animate()
        }
        else{
            bg_effect.textContent = "DISABLED"
        }
    }
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = randomColor()
        this.radius = randomNumber(1,5)
      }
      draw() {
        ctx.beginPath()
        ctx.fillStyle = randomColor()
        ctx.arc(this.x, this.y, this.radius,0,2*Math.PI);
        ctx.fill()
      }
    }
    const createparticles = () =>{
        for (let i = 0; i < 40; i++) {
          particles.push(new Particle(randomNumber(0,c.width),randomNumber(0,c.height)))
        }
      }
    const animate = () =>{
    createparticles()
      for (let i = 0; i < particles.length; ++i) {
         particles[i].draw()
      }
    }
    }  // window