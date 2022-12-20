
let wall = document.getElementById('screen')
let text = document.getElementById('gen')
let gen=1;
let center= window.innerHeight/2

let path = new Path(wall)
path.draw(new Vector(window.innerWidth/2,window.innerHeight/2),250)
let obstacle = path.lines.concat(path.lines1) //adding both lines and lines1 list 

let prev_best_distance =0

let i = new Input()


//let car = new Car('yellow',new Vector(center,center),30,50,wall,0)
let active_car =[]
let damaged_car= []
let best_car;

function spawn_car(n){
    for(let i=0;i<n ; i++){
        active_car[i]= new Car('#FF4720',new Vector(window.innerWidth/2+300,center),20,30,wall,i)
    }

    if(get_data('best_car_weight')!==null && get_data('best_car_bias')!==null){
        //if the best car data is available , then set them to the first car
        active_car[0].weight= get_data('best_car_weight')
        active_car[0].bias= get_data('best_car_bias')
    }
    best_car= active_car[0]
    active_car[0].is_best_car = true
    active_car[0].distance=1
}

function respawn_car(){
    gen++
    text.innerHTML= "GEN "+String(gen)
    
    if(best_car.distance > prev_best_distance){
    //if current best car is better than prev best car only then save the data
    prev_best_distance= best_car.distance
    save_data('best_car_weight',best_car.weight)
    save_data('best_car_bias',best_car.bias)
    console.log('data saved')
    }
    active_car.forEach(car=>{
        car.is_damaged= false
        car.pos= new Vector(window.innerWidth/2+300,center)
        // car.weight= generate_weight(layer)
        // car.bias= generate_bias(layer)
        car.distance=0
        car.is_best_car= false
        car.mutate(layer,best_car.weight,best_car.bias)
        car.update(obstacle)
      
    })
    active_car[0].weight = best_car.weight
    active_car[0].bias = best_car.bias

    best_car= active_car[0]
    active_car[0].is_best_car= true

    damaged_car=[]
}

function is_cycle_end(){
    //returns true if all car is damaged
    return active_car.length== damaged_car.length
}



function update(){
    // if car is not damaged , then update it or remove it
    //find the best car
    //if all car are damaged, then save the best weight,bias ,then restart
    //let vel =0
    //let dist =0
    
    active_car.forEach(car=>{
        if(!car.is_damaged){
            car.update(obstacle)
            //vel= car.velocity.y 
           // vel = car.velocity.magnitude()

        if(car.distance > best_car.distance){
            //find the best car
           // best_car.is_best_car= false
            active_car[active_car.indexOf(best_car)].is_best_car= false
            car.is_best_car= true

            // dist= car.distance
            best_car= car
            best_car.is_best_car =true
        }
        

        }

        else if(!damaged_car.includes(car)){
            damaged_car.push(car)
            
            if(is_cycle_end()){ respawn_car()}
        }

    })

    //if no car is moving forward , then restart 
    // if(vel <= 0.3){
    //     respawn_car()
    // }

   

}

function save_best_car_info(){
    save_data('best_car_weight',best_car.weight)
    save_data('best_car_bias',best_car.bias)
    
    console.log('best car data is saved')
}





spawn_car(50)
//update()

// setInterval(() => {
//    // console.log('running')
//     update()
// }, 100);


// --------------------------------------------------------**

















// function update(){
//     if(t1==0){
//         let d1 = new Date()
//         t1= d1.getTime()
//     }

//     active_car.forEach(car=>{
//         if(!car.is_damaged){
//              car.pos.y =  100+(car.velocity.magnitude()*10)
//             car.update(road.lines)
//         }
//         else if (!damaged_car.includes(car)){
//             damaged_car.push(car)
//             car.body.rect.style.opacity =.2
//             if(damaged_car.length == active_car.length){
//                 //all the car is damaged, so restart 
//               //  console.log('respawned')
//                 respawn_car()

//             }
//         }

//     })

//     best_car = get_best_car()
//     if(best_car){
//         //if(best_car.velocity.y==0){best_car.velocity.y=2; 
//            // best_car.update(road.lines)}

//         if(best_car.velocity.y ==0){best_car.velocity.y= -2}
        
//         best_car.body.rect.style.backgroundColor= 'yellow'
//         road.update(best_car.velocity)
//     }


    
//    //console.log(best_car.weight)
   
   
// }