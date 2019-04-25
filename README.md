## CRUD on mutable object within create new object
//default state
let state = {
  fruits : [
    {
      id: 0,
      name: "apple"
    },
    {
      id: 1,
      name: "banana"
    }
  ],
  fruit : {}
}

//add to fruits
let addState = Object.assign(
  {},
  state,
  {
    fruits: Object.assign([], state.fruits).concat({ id: 2, name: "mango" })
  }
);

//edit fruit on fruits
let editState = Object.assign(
  {},
  addState,
  {
    fruits: (Object.assign([], addState.fruits)).map(fruit => {
      let tempObj = Object.assign({}, fruit);
      if(tempObj.id===1){
        tempObj.name = "kiwi"
      }

      return tempObj;
    })
  }
);

//delete fruit on fruits
let deleteState = Object.assign(
  {},
  editState,
  {
    fruits: Object.assign([], editState.fruits).filter(fruit => { return fruit.id!==1 })
  }
);

//new state
console.log("default state:");
console.log(state);
console.log("==============================================");
console.log("after add state:");
console.log(addState);
console.log("==============================================");
console.log("after edit state:");
console.log(editState);
console.log("==============================================");
console.log("after delete state:");
console.log(deleteState);
