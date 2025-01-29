import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const MONTH = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const DAY = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
const DAY_LETTER = DAY.map((day, index)=>day.slice(0, 1))
const EVENT_LIST = []
for (let i=0; i<31; i++){
  EVENT_LIST.push({confirmed:false});
}

export default function App() {
  const ROW = [];
  const [eventList, setEventList] = useState(EVENT_LIST)
  console.log(eventList)

  for (let i=0; i<31; i++){
    ROW.push(<Day jour={i+1} className={"backgroundOrange"} onClick={(event)=>handleClick(event)}/>);
  }
  return (
    <div className="content">
      <FormCalendar onSubmit={(event)=>handleSubmit(event)}/>
      <article className='card'>
        <Day jour={MONTH[9]} className={'month'}/>
        <section className='grid-7'>
          {DAY_LETTER.map((oneDayLetter, index)=><div>{oneDayLetter}</div>)}
        </section>
        <section className='grid-7 days'>
          {ROW.map((oneRow, index)=>oneRow)}
        </section>
      </article>
      <article onChange={FormCalendar.onSubmit}>
        <h2>Liste des évènements</h2>
        <Liste liste={eventList}/>
      </article>
    </div>
  )

  function handleClick(event) {
    let selected = Array.from(document.getElementsByClassName('selected'));
    if (selected.length > 0){
      selected.map((element, index)=> {
        console.log(element)
        if (element != event.target) {
          element.classList.remove('selected');
        }
      });
    }
    event.target.classList.toggle('selected')
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target);
    let emptyInput = false;
    for (let i=0; i<event.target.length; i++) {
      let childValue = event.target[i].value;
      console.log (childValue);
      childValue == "" && (emptyInput = true);
    }
    if(emptyInput == true) {
      alert('Il faut remplir tous les champs');
      return;
    }

    const DATE = [...document.querySelectorAll('.days div')]
    let selected
    DATE.map((element, index)=>{
      if (element.classList.contains('selected')) {
        selected = index
      };
    })
    if (selected == "undefined" || selected == null) {
      alert('sélectionner une date')
      return;
    }
  
    const NEW_EVENEMENT = {nom:event.target[0].value, heure:event.target[1].value, lieu:event.target[2].value, index:selected, confirmed:true}
    console.log (NEW_EVENEMENT)

    const TAB = [...eventList]
    TAB[selected]=NEW_EVENEMENT
    setEventList(TAB)
  }
}

function Day({jour, className, onClick}){
  return (
    <div className={className} onClick={(event)=>onClick(event)}>{jour}</div>
  )
}

function FormCalendar({onSubmit}) {
  return (
    <form className="form card" onSubmit={(event)=>onSubmit(event)}>
      <h2>Nouvel événement</h2>
      <br />
      <input type="text" name="" id="" placeholder="Nom de l'évènement"/>
      <br />
      <input type="text" name="" id="" placeholder="Horaire" />
      <br />
      <input type="text" name="" id="" placeholder="Lieu" />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  )
}

function Liste({liste}) {
  let listeRetour = [];
  liste.map((unEvenement, index)=>{
    if(unEvenement.confirmed == true){
      listeRetour.push(unEvenement)
    }
  })
  if (listeRetour.length == 0) {
    return(
      <>
        <p>Pas d'évènement</p>
      </>
    )
  }else {
    return (
      <>
        {listeRetour.map((evenement, index)=><p>{evenement.nom} - {evenement.lieu} - {evenement.heure}</p>)}
      </>
    )
  }
}
