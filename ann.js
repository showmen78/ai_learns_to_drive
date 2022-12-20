//------------------------- SHOWMEN DEY -------------------------------------//



// let input = new Array(1,1,1)
// let layer = [input.length,6,4]
// let weight= generate_weight(layer)
// let bias = generate_bias(layer)




class Ann{
    constructor(layer,weight,bias){

        this.layer=layer
      //  this.input= input
        this.weight= weight
        this.bias = bias
        this.layers=[]
        //this.output =this.input

        //this.calculate_output(this.input)
        let output =[] //for testing 
        for(let l =0 ; l<this.layer.length-1; l++){
            this.layers[l] = new Level(output,this.layer[l+1],this.weight[l],this.bias[l])
        }


    }

    calculate_output(input){
        this.output = input;
        for (let l =0 ; l<this.layer.length-1; l++) {  //layer
         
            this.output= this.layers[l].calculate_outputs(this.output)  //calculating the output of the layers
            
        }

       // console.log(this.output)
        return this.output

        //console.log(this.output)
    }

    
}




class Level{
  // calculate output of each level ....
    constructor(input,output_node,weight,bias){
        this.input= input
        this.output_node = output_node
      //  this.output = new Array(output_node)
        this.weight= weight
        this.bias= bias

    
    }

    calculate_outputs(input){

        //calculating the output z = sigmoid(wx+b)
        this.input = input
        let output =[]
        
        //this.output = new Array(output_node)
        for (let i =0; i<this.output_node; i++){
            let sum =0
            for (let j =0 ; j<this.input.length; j++){

                sum += (this.input[j]*this.weight[j][i]+this.bias[i])
                
            }
            if (sigmoid(sum)>.5){output.push(1)}
            else{output.push(0)}
           
        }
      //  console.log(output)

        return output
    }



}
//let a = new Ann(layer,input,weight,bias)
//let l  = new Level(input,4)
