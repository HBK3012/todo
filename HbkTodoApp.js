 

//model
let todo_array=[];
let saved_todo=JSON.parse(localStorage.getItem('todossss'));
if(Array.isArray(saved_todo)){
  todo_array=saved_todo;
}else{
  todo_array=[{Title:"hbk",Date_input:"07-03-2023",Id:"id1",isDone:false},{Title:"hbk",Date_input:"07-03-2023",Id:"id2",isDone:false}];
}
//createTodo
function create_Todo(text,date,id){
  todo_array.push({
    Title:text,
    Date_input:date,
    Id:id,
    isDone:false
  });
  reload();
  save_todo();
  
}
//removeTodo
function remove_todo(delete_todo){
  todo_array=todo_array.filter(function(todo){
    return todo['Id'].toString()!==delete_todo;
  });
  save_todo();
  reload();
}
//completed todo
function completed_todo(checked_todo,check_box_value){   
  todo_array.forEach(function(todo){
    if (todo.Id.toString()===checked_todo){
      todo.isDone=check_box_value;
    }
  });
  save_todo();
  reload();
  
}
//edit todo
function edit_todo(new_todo,new_date,to_edit_todo){
  todo_array.forEach(function(todo){
    if (to_edit_todo===todo.Id.toString()){
      if(new_todo!==" " && new_todo!== "" ){
        todo.Title=new_todo;
      }else{
        todo.Title;
      }
      if(new_date!== "" ){
        todo.Date_input=new_date;
      }else{
        todo.Date_input;
      }  
    }   
  });
  save_todo();
  reload();
}
//save todo
function save_todo(){
  localStorage.setItem('todossss',JSON.stringify(todo_array));
}
//view 
let input_div=document.getElementById("input_div");
let text_box=document.getElementById("text_input");
let date_box=document.getElementById("date_input");
let Add_button=document.getElementById("add_button");
Add_button.className="add_button";
let todo_list=document.createElement("div");
todo_list.innerText="";
document.body.appendChild(todo_list);
function render_todo(){
  todo_list.innerText="";
  todo_array.forEach(function(todo){
    let todo_total_div=document.createElement('div');
    let check_box=document.createElement('input');
    check_box.type="checkbox";
    check_box.style="display: inline-block; margin-right:5px;";
    todo_total_div.id=todo.Id;  
    todo_total_div.className="total_todo_div";   
    todo_total_div.style=" display:flex;align-items:center;gap:12px;flex-wrap:nowrap;";
    todo_list.style="margin-top:5px;display:flex;flex-direction: column;gap:5px; margin-top:12px;";
    let todo_div=document.createElement('div');
    todo_div.innerText=todo.Title+"   "+todo.Date_input;
    todo_div.className="todo";
    
    todo_total_div.appendChild(todo_div);
    todo_list.appendChild(todo_total_div);
    let edit_button=document.createElement('button');
    edit_button.innerText="Edit";
    todo_total_div.appendChild(edit_button);
    let delete_button=document.createElement("button");
    delete_button.innerHTML="Delete";
    delete_button.className="delete_button";
    delete_button.onclick=delete_todo_func;
    delete_button.id=todo["Id"];
    todo_total_div.appendChild(delete_button);
    check_box.onchange=checkbox_func;
    check_box.id=todo.Id;
    check_box.checked=todo.isDone;    
    edit_button.id=todo.Id;
    edit_button.onclick=edit_func;
    edit_button.className="edit_button";
    text_box.value="";
    date_box.value="";
    todo_total_div.prepend(check_box);
});
}
render_todo();
//controller
//to add todo
Add_button.onclick=function(){
  let text=text_box.value;
  let date=date_box.value;
  let id=new Date().getTime();
  create_Todo(text,date,id);
  render_todo();
}
//to delete todo

function delete_todo_func(event){
  let Delete_button=event.target;
  let delete_todo=Delete_button.id;
  remove_todo(delete_todo);
  render_todo();
  
}
//to checktodo
function checkbox_func(event){
  let check_box_button=event.target;
  let checked_todo=check_box_button.id;
  let check_box_value=check_box_button.checked;
  completed_todo(checked_todo,check_box_value);
  render_todo();
}
function edit_func(event){
  let to_edit_button=event.target;
  to_edit_todo=to_edit_button.id;
  let new_date='';
  let new_todo="";
  todo_array.forEach(function(todo){
    if(todo.Id.toString()===to_edit_todo){
      let edit_total_todo=document.getElementById(to_edit_todo);
      edit_total_todo.innerText="";
      edit_total_todo.className="edit_total_todo";
      let edit_todo_input=document.createElement('input');
      edit_todo_input.className="edit_todo_input";
      edit_todo_input.placeholder="Enter the Todo to be updated"
      edit_total_todo.appendChild(edit_todo_input);
      let edit_todo_date=document.createElement('input');
      edit_todo_date.type="date";
      edit_todo_date.className="edit_todo_date";
      edit_total_todo.appendChild(edit_todo_date);
      let update_button=document.createElement('button');
      update_button.innerText="Update";
      edit_total_todo.appendChild(update_button);
      let cancel_button=document.createElement('button');
      cancel_button.innerHTML="Cancel";
      edit_total_todo.appendChild(cancel_button);
      edit_total_todo.style="display:flex;align_items:center;";
      update_button.className="update_button"
      update_button.onclick=function(){
         new_todo=edit_todo_input.value;
         new_date=edit_todo_date.value;
         edit_todo(new_todo,new_date,to_edit_todo);
         render_todo();
         reload();
      }
      cancel_button.className="cancel_button"
      cancel_button.onclick=function(){
        render_todo();
        reload();
      };
    }
  });
   
}
const input =document.querySelector(".switch_input");
const body = document.querySelector( "body");
const title =document.querySelector(".web_title");
const todo_input_div=document.querySelector(".text_input");
const date_input_div=document.querySelector(".date_input");
const ADD_button=document.querySelector(".add_button");
const Todo_Div=document.querySelectorAll(".todo");
const Edit_button=document.querySelectorAll(".edit_button");
const Delete_Button=document.querySelectorAll(".delete_button");
const Update_Button=document.querySelector('.edit_button');
const Cancel_Button=document.querySelector('.cancel_button');
const Edit_Todo_Date=document.querySelector('.edit_todo_date');
const Edit_Todo_Input=document.querySelector('.edit_todo_input')
if(localStorage.getItem('dtheme')===null){
  localStorage.setItem('dtheme','false');
}

function check_status(){
  if(localStorage.getItem('dtheme')==='true'){
    input.checked=true;
    localStorage.setItem('dtheme','true');
    body.classList.add("dark");
    title.classList.add("dark");
    todo_input_div.classList.add("dark");
    date_input_div.classList.add("dark");
    ADD_button.classList.add("dark");
    for(let i=0;i<Todo_Div.length;i++){
      Todo_Div[i].classList.add("dark");
      Edit_button[i].classList.add("dark");
      Delete_Button[i].classList.add("dark");
      //Update_Button.classList.add("dark");
      //Cancel_Button.classList.add("dark");
      //Edit_Todo_Date.classList.add("dark");
      //Edit_Todo_Input.classList.add("dark")
    }

  }
  else{
    localStorage.setItem('dtheme','false');
    input.checked=false;
    body.classList.remove("dark");
    title.classList.remove("dark");
    todo_input_div.classList.remove("dark");
    date_input_div.classList.remove("dark");
    ADD_button.classList.remove("dark");
    for(let i=0;i<Todo_Div.length;i++){
      Todo_Div[i].classList.remove("dark");
      Edit_button[i].classList.remove("dark");
      Delete_Button[i].classList.remove("dark");
     // Update_Button[i].classList.remove("dark");
      //Cancel_Button[i].classList.remove("dark");
      //Edit_Todo_Date[i].classList.remove("dark");
      //Edit_Todo_Input[i].classList.remove("dark");
  }
  }
}
function reload(){
  document.location.reload();
}
check_status();
const toggleThemeMode = ()=>{ 
  if (localStorage.getItem('dtheme')==='true'){
    localStorage.setItem('dtheme','false');
}else{
  localStorage.setItem('dtheme','true');
 }
 check_status();
}; 
input.onchange = toggleThemeMode;
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  check_status();
} 