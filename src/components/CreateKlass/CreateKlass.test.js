import CreateKlass from './CreateKlass'
import React from 'react';
import {expect} from 'chai';
import {shallow, mount, render} from 'enzyme';
import sinon from 'sinon';
import axios from 'axios';
import nock from 'nock';
import httpAdapter from 'axios/lib/adapters/http';

axios.defaults.adapter = httpAdapter;

describe('CreateKlass component', () => {

    beforeEach(() => {
        nock.disableNetConnect();
    });

    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();
    })

    it('should render without error', () => {
        const wrapper = shallow(<CreateKlass />);
        expect(wrapper).to.be.ok;
    });

    it('should find component using its class name', () => {
        const wrapper = shallow(<CreateKlass />);
        expect(wrapper.find(".create-klass").length).to.equal(1);
    });

    it('should call preventDefault when i click on create button', ()=> {
        const stub = sinon.stub(); 
        const wrapper = mount(<CreateKlass />);
        wrapper.find('button').simulate('click', {preventDefault:stub});
        expect(stub.callCount).to.equal(1);
  });

  it('should NOT show error message when all fields are filled', ()=> {
      const wrapper = mount(<CreateKlass />);
      wrapper.find('input').get(0).value = 'Physics';
      wrapper.find('input').get(1).value = '07/02/17';
      wrapper.find('input').get(2).value = 3;
      wrapper.find('input').get(3).value = 200;
      wrapper.find('button').simulate('click');
      expect(wrapper.state('error')).to.be.null;
  });

   it('should show error message when all fields are empty', ()=> {
      const wrapper = mount(<CreateKlass />);
      wrapper.find('input').get(0).value = '';
      wrapper.find('button').simulate('click');
      expect(wrapper.state('error')).to.equal('All fields are mandatory!!');
  });

it('should create a klass', (done)=> {

      nock("http://fakehost.com")
      .post('/klasses', { 
                          name : 'Physics', 
                          semester : '07/02/17',
                          credits : '3',
                          department : 'SCIENCE',
                          fee : '200'
                        })
      .reply(200, { 
                          id : 99,
                          name : 'Physics', 
                          semester : '07/02/17',
                          credits : 3,
                          department : 'SCIENCE',
                          fee : 200
                        })

      const stub = sinon.stub();
      
      const wrapper = mount(<CreateKlass host="http://fakehost.com" created={stub}/>);
      
      wrapper.find('input').get(0).value = 'Physics';
      wrapper.find('input').get(1).value = '07/02/17';
      wrapper.find('input').get(2).value = 3;
      wrapper.find('select').get(0).value = 'SCIENCE';
      wrapper.find('input').get(3).value = 200;
      wrapper.find('button').simulate('click');
      
      setTimeout(() => {
          try{
            expect(stub.callCount).to.equal(1);
            expect(stub.getCall(0).args[0]).to.deep.equal({ 
                          id : 99,
                          name : 'Physics', 
                          semester : '07/02/17',
                          credits : 3,
                          department : 'SCIENCE',
                          fee : 200
                        })
            expect(wrapper.find('input').get(0).value).to.equal('');
            done();
        }catch(e){
            done.fail(e)
         }
      } ,1000);
      
 });

 it('should show server failure error', (done)=> {
      nock("http://fakehost.com")
      .post('/klasses', { 
                          name : 'Physics', 
                          semester : '07/02/17',
                          credits : '3',
                          department : 'SCIENCE',
                          fee : '200'
                        })
      .replyWithError('server just exploded')

      const stub = sinon.stub();
      
      const wrapper = mount(<CreateKlass host="http://fakehost.com" created={stub}/>);
      
      wrapper.find('input').get(0).value = 'Physics';
      wrapper.find('input').get(1).value = '07/02/17';
      wrapper.find('input').get(2).value = 3;
      wrapper.find('select').get(0).value = 'SCIENCE';
      wrapper.find('input').get(3).value = 200;
      wrapper.find('button').simulate('click');
      
      setTimeout(() => {
          try{
            expect(stub.callCount).to.equal(0);
            wrapper.find('input').get(0).value = 'Physics';
            wrapper.find('input').get(1).value = '07/02/17';
            wrapper.find('input').get(2).value = 3;
            wrapper.find('select').get(0).value = 'SCIENCE';
            wrapper.find('input').get(3).value = 200;
            expect(wrapper.state('error')).to.equal('server just exploded')
            done();
        }catch(e){
            done.fail(e)
    }
      
      } ,1000);
      
});
})