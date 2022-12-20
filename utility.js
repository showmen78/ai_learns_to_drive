
class Input{
    constructor(){
        document.addEventListener('keydown',event=>{
            
   
      //  if(event.repeat) return;
        switch(event.key){
            case "ArrowUp":
                //console.log('up')
              //  car.move_dir.x = 1
               save_best_car_info()
   
               // car.update()
               // car.move_up(1)
               // road.update()
               
                //car.move(1,0)
            break;
            case "ArrowDown":
              //  car.move_dir.x = -1
               // car.update()
               // car.move_down(-1)
                //car.move(-1,0)
            break;

            case "ArrowLeft":
               
             //   car.move_dir.y= -1
               // car.move(0,-1)
            break;

            case "ArrowRight":
             
             //   car.move_dir.y= 1
               // car.move(0,1)
            break;


        }
    
})

document.addEventListener('keyup',event=>{
            
   
    //  if(event.repeat) return;
      switch(event.key){
          case "ArrowUp":
           // console.log('key up')
            //  car.move_dir.x = 0
             // car.update()
              
              //car.move(1,0)
          break;
          case "ArrowDown":
            //  car.move_dir.x =0 
             // car.update()
              
              //car.move(-1,0)
          break;

          case "ArrowLeft":
              
           //   car.move_dir.y= 0
             // car.move(0,-1)
          break;

          case "ArrowRight":
             
           //   car.move_dir.y= 0
             // car.move(0,1)
          break;


      }
  
})

    }



}

function in_range(v,max,min){
    //returns a value of v in the max and min range
    if(v >min && v <  max){return v}
    else if (v >= max ){return max}
    return min
}

function get_sign(v){
    //returns if a value is + or - 
    if(v==0){return 0}
    else if (v >0){return 1}
    else {return -1}
}


function is_intersecting(a,b,c,d){
    //a,b - start and end pos of the first vector
    //c,d - start and end pos of the second vector.
    //checks for intersection with obstacles.

    let den = ((a.x-b.x)*(c.y-d.y))-((a.y-b.y)*(c.x-d.x))
  
    let t = ((a.x-c.x)*(c.y-d.y))-((a.y-c.y)*(c.x-d.x))
    let u = ((a.x-c.x)*(a.y-b.y))-((a.y-c.y)*(a.x-b.x))
    t /= den
    u /= den

    if(u>0 && u<=1 && t>0 && t<=1){
        let p_x = a.x+t*(b.x-a.x)
        let p_y= a.y+ t*(b.y-a.y)

       // console.log(p_x,p_y)

        return [Vector._distance(a,new Vector(p_x,p_y)),new Vector(p_x,p_y)]
    }
    return -1

  
}



function get_end_pos(start_pos , angle,len){
    //returns the end point of the lines
    let end_pos =  new Vector(start_pos.x+(len*Math.cos(Vector.to_rad(angle))),
    start_pos.y+(len*Math.sin(Vector.to_rad(angle))))


    return end_pos

}

function get_min(arr){

    if(arr.length==0){
        return []
    }

    let min =10000
    let min_line=[] ;
   

    for(let i =0;i<arr.length;i++){
        if(arr[i] !== -1 && arr[i][0]< min){
            min = arr[i][0]
            min_line = arr[i]

        }
    }
    

    return min_line

}


function sigmoid(z){
    return 1/(1+Math.exp(-z))
}

function generate_weight(layer){
    let weight=[]
    for (let i=0; i<layer.length-1; i++){ //layer
        weight[i]= new Array(layer[i])
        for (let input=0; input<layer[i]; input++){ //input
         weight[i][input]= new Array(layer[i+1])
     
         for (let output =0; output<layer[i+1]; output++){   //output
             weight[i][input][output]= Math.random()*2 -1
         }
     
        }
     
       
        
     
     }
     return weight
}

function generate_bias(layer){
    let b =[]
    for (let i =0; i<layer.length-1; i++){ //for layer
        b[i]= new Array(layer[i+1])
        for (let j =0 ; j<b[i].length; j++){ //output 
            b[i][j]= (Math.random()*2 -1)*.1
        }
    }

    return b
}


function lerp(a,b,t){
    return a+(b-a)*t
}

function save_data(id,data){
    //save data to local storage
    localStorage.setItem(id,JSON.stringify(data))
}

function get_data(id){
    //return saved data
    return JSON.parse(localStorage.getItem(id))
}

function get_angle(a,b){
    //a = path
    //b= center
    let angle = Math.abs(Math.atan((a.y-b.y)/(a.x-b.x)))
    if(a.x>b.x && a.y>=b.y){
        //first quadrant
        return  angle
    }
    else if (a.x>b.x && a.y <= b.y){
        //4th
        return (2*Math.PI)-angle
    }
    else if(a.x < b.x && a.y >= b.y){
        //2nd
        return Math.PI - angle
    }
    else{
        //3rd
        return Math.PI+angle
    }

}