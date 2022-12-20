
let no_of_sensor=7
let layer = [no_of_sensor,10,10,3]
let output =[]
let c= new Vector(window.innerWidth/2,window.innerHeight/2)
// let weights ={'1':2}
// let bias ={}

// weights= JSON.stringify(localStorage.getItem('weights'))//check if there is any saved data 
// bias= JSON.stringify(localStorage.getItem('bias'))
let k =2

class Car{
    constructor(color,pos,width,height,wall,id){
        this.pos = pos
        this.width = width;
        this.height = height
        this.body = new Shape(color)
        this.rot = 0
        this.body.rect.style.rotate= String(this.rot)+'deg'
        this.move_dir= new Vector(0,0)
      
        this.wall = wall
        this.id = id
    
        this.acc = 1
        this.forward= this.get_forward_dir()
        this.vel_mag = 0//magnitude of the velocity
        this.velocity = new Vector(0,0) //velocity vector
        this.max_vel = 10
        this.friction = .5
        this.is_damaged= false
       
        this.distance = 0 //distance travelled
        this.is_best_car= false
       // this.start_pos = this.pos
       this.prev_pos = this.pos
        

       this.weight= generate_weight(layer)
       this.bias = generate_bias(layer)

       if(get_data('best_car_weight')!==null && get_data('best_car_bias')!==null && this.id ==0){
        //if the best car data is available , then set them to the first car
        this.weight = get_data('best_car_weight')
        this.bias= get_data('best_car_bias')
    }

       this.brain = new Ann (layer,this.weight,this.bias)

        this.sensors=[]
        for(let i=0;i<no_of_sensor;i++){
            this.sensors.push(new Sensor((i*30),150,this,this.wall))
        }
      
        this.rect= this.body.drawRect(this.width,this.height,this.pos.x,this.pos.y,this.wall)
        this.rect.style.border= "2px solid white" ;
        
       
      
        this.draw()

    }

 

    update(obstacles){
        
      //  this.body.rect.style.backgroundColor= 'red'
       // this.body.style.backgroundColor= 'red'
       if(this.is_best_car){
        //this.rect.classList.add('best_car')
        this.set_color('yellow')
      //  this.rect.style.zIndex=100
      //  console.log(this.id)
       }
       else{
      // this.rect.classList.remove('best_car')
     //  this.rect.style.zIndex=1
       }

        if(!this.is_damaged){

        output=[]
        this.sensors.forEach(s => {
            output.push(s.update(obstacles)) //sensors sends the distance as the input data
           
        });
        output = this.brain.calculate_output(output) //output returned by the brain
        
       // console.log(output)
        this.move(output)

        //calculating distance
  
        
        //this.distance = Math.abs(300*(get_angle(this.pos,c))) //s= rq formula
        this.distance += Vector._distance(this.pos,this.prev_pos)
        this.prev_pos = this.pos

        if(this.velocity.magnitude()<= .6){this.is_damaged= true}

        this.draw()
       // this.rect.style.backgroundColor= 'black'
        //this.move_up(1)
        
        
    }
}

    set_color(color){
        this.rect.style.backgroundColor= color
    }


    move(output){

        this.move_dir.x = (output[0]==1)?1:0
       // this.move_dir.x = (output[1]==1)?-1:0
        this.move_dir.y = (output[1]== 1)?-1:0
        this.move_dir.y = (output[2]==1)?1:0




     //add acceleration to velocity
     this.rot += (this.move_dir.y*5)
     if(this.velocity.magnitude() < this.max_vel){
     this.velocity.add(Vector._mult(this.get_forward_dir(),this.acc*this.move_dir.x))
 }

     if(this.move_dir.x ==0){
        this.friction= 1.5
        if(this.velocity.magnitude()< .3){this.velocity= new Vector(0,0)}
    }
     else{this.friction= .5}

     if(this.velocity.magnitude()!==0){
         //if the velocity is not 0 then decrease the velocity due to friction
         let friction_dir = Vector._mult(this.velocity,-1).normalize()
         friction_dir.mult(this.friction)
         this.velocity.add(friction_dir)
     }

     //update the position 
      this.pos.x += this.velocity.x
      this.pos.y -= this.velocity.y
  //   console.log(this.velocity.magnitude())
    }

    





    draw(){
        this.body.drawRect(this.width,this.height,this.pos.x,window.innerHeight-this.pos.y,this.wall)
        this.body.rect.style.rotate= String(this.rot)+'deg'
    }

    get_forward_dir(){
        return new Vector(Math.sin(Vector.to_rad(this.rot)),
        -Math.cos(Vector.to_rad(this.rot)))
    }

    mutate(layer,best_weight,best_bias){
        //changing weight
        for (let i=0; i<layer.length-1; i++){ //layer
            
            for (let input=0; input<layer[i]; input++){ //input
            
                for (let output =0; output<layer[i+1]; output++){   //output
                    this.weight[i][input][output]= lerp(this.weight[i][input][output],best_weight[i][input][output],.1)
                }
            
            }
                       
            }

        for(let i =0;i <layer.length-1;i++){
            //changing bias
            for(let l=0; l<layer[i+1];l++){
                this.bias[i][l]= lerp(this.bias[i][l],best_bias[i][l],.1)
            }

        }
        //    localStorage.setItem("car_weight"+String(this.id),JSON.stringify(this.weight))
        //    localStorage.setItem('car_bias'+String(this.id),JSON.stringify(this.weight))


    }


    die(){
        this.is_damaged = true
        this.velocity = new Vector(0,0)
       // this.body.rect.style.opacity = "0";
        this.move_dir.y=0
        this.move_dir.x=0

       // this.set_color('black')
      //  this.pos = this.pos
      //console.log('died')



    }
}