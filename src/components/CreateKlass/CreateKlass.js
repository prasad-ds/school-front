import React from 'react';
import './CreateKlass.css';
import axios from 'axios';

export default class CreateKlass extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.create = this.create.bind(this);
    }

    create(e){
        e.preventDefault()
        this.setState({error:null});
        const name = this.name.value;
        const semester = this.semester.value;
        const credits = this.credits.value;
        const fee = this.fee.value;
        
        if(name.length == 0 || semester.length == 0 || credits < 0 || fee<0) {
            console.log("entered")
            this.setState({error: 'All fields are mandatory!!'});
            return;
        }

        const url = this.props.host + '/klasses';
        console.log('url',url)
        const payload = { 
                          name : this.name.value, 
                          semester : this.semester.value,
                          credits : this.credits.value,
                          department : this.department.value,
                          fee : this.fee.value
                        };

                        console.log('payload in the klass',payload )
        axios.post(url, payload)
        .then(rsp => {
            const klass = rsp.data;
            this.props.created(klass);
            this.name.value = '';
            this.semester.value = '';
            this.credits.value = '';
            this.fee.value = '';

         })
        .catch(e => {
            console.log(e)
            this.setState({error: e.message})
        });
    }
    render() {
        return (
            <div className="create-klass">
            <h3>Create Class</h3>
            <div className={this.state.error ? "error" : ""}>{this.state.error}</div>
                <form> 
                    <div>
                        <label>Name</label>
                    </div>                
                    <div>
                        <input type="text" ref={ n => this.name = n} placeholder="Enter your class name..."/>
                    </div>
                    <div>
                        <label>Semester</label>
                    </div>                      
                    <div>
                        <input type="DATE" ref={ n => this.semester = n} />
                    </div>
                    <div>
                        <label>Credits</label>
                    </div>                      
                    <div>
                        <input type="number" ref={ n => this.credits = n} placeholder="Credits"/>
                    </div>
                    <div>
                        <label>Department</label>
                    </div>                                          
                    <div>
                        <select ref={ n => this.department = n}>
                            <option>SCIENCE</option>
                            <option>ENGINEERING</option>
                            <option>LITERATURE</option>
                            <option>PHILOSOPHY</option>
                        </select>
                    </div>  
                    <div>
                        <label>Fee</label>
                    </div>                                           
                     <div>
                        <input type="number" ref={ n => this.fee = n} placeholder="Fee"/> 
                    </div>          
                    <div>
                        <button className="btn btn-danger btn-small" onClick={this.create}>Create</button>
                    </div>                
                </form>
            </div>);
    }
}
