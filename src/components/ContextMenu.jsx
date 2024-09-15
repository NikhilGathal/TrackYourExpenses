import React from 'react'

function ContextMenu({position, setmenuposition ,setExpenses , rowid ,setExpense,expense,seteditingid}) {
  if(!position.left)
    return
  return (
    <div className="context-menu" style={ {left:position.left,top: position.top ,display:'block' }}>
    <div onClick={()=> 
  { 
    
    console.log('Editing') 
    setmenuposition({})
    seteditingid(rowid)
  //    const edit = expense.filter(exp => exp.id === rowid);  
  // setExpense({
  //   title:edit[0].title,
  //   category : edit[0].category,
  //   amount : edit[0].amount
  // })


  const {title,category,amount}= expense.find( (exp)=> exp.id === rowid )
// console.log(found);
  setExpense({title,category,amount})
  
  
  }
    }>Edit</div>








    
    <div onClick={()=>
     {console.log('Deleting')
      setmenuposition ({})
     setExpenses( (prev)=> prev.filter( exp => exp.id !== rowid ) )
     seteditingid(rowid)
    }
    }>Delete</div>
</div>
  )
}

export default ContextMenu