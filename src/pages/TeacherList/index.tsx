import React, { useState, FormEvent } from 'react'

import PageHeader from '../../components/PageHeader';


import './styles.css';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';





function TeacherList() {
    
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    const [teachers, setTeachers] = useState([]);

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);



        console.log(response.data);

    }


    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title='Estes são os proffys disponíveis'>
                <form id='search-teachers' onSubmit={searchTeachers}>
                    <Select 
                        name='subject' 
                        label='Matéria'
                        value={subject}
                        onChange={(e)=> {
                            setSubject(e.target.value)
                        }}
                        options={[
                            {value: 'Artes', label: 'Artes'},
                            {value: 'Biologia', label: 'Biologia'},
                            {value: 'Física', label: 'Física'},
                            {value: 'Geografia', label: 'Geografia'},
                            {value: 'História', label: 'História'},
                            {value: 'Matemática', label: 'Matemática'},
                            {value: 'Química', label: 'Química'},
                            {value: 'Português', label: 'Português'},
                       ]}
                    />
                    
                    <Select 
                        name='week_day' 
                        label='Dia da Semana'
                        value={week_day}
                        onChange={(e) => {
                            setWeekDay(e.target.value)
                        }}
                        options={[
                            {value: '0', label: 'Domingo'},
                            {value: '1', label: 'Segunda'},
                            {value: '2', label: 'Terça'},
                            {value: '3', label: 'Quarta'},
                            {value: '4', label: 'Quinta'},
                            {value: '5', label: 'Sexta'},
                            {value: '6', label: 'Sábado'},
                            
                       ]}
                    />

                    <Input 
                        type='time' 
                        name='time' 
                        value={time}
                        onChange={(e) => {
                            setTime(e.target.value)
                            
                        }}
                        label='Hora'
                    />

                    <button type='submit'>Buscar</button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}/>
                })}

                
                
            </main>
        </div>
    )
}

export default TeacherList;