import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import nock from 'nock';
import httpAdapter from 'axios/lib/adapters/http';

import CreateStudent from './CreateStudent';


axios.defaults.adapter = httpAdapter;
describe('CreateStudent', () => {
  beforeEach(() => {
      nock.disableNetConnect();
  });

  afterEach(() => {
      nock.cleanAll();
      nock.enableNetConnect();
  })

  it('should render without error', () => {
    const wrapper = shallow(<CreateStudent />);
    expect(wrapper).to.be.ok;
  });

  it('should find component using its class name', () => {
    const wrapper = shallow(<CreateStudent />);
    expect(wrapper.find(".create-student").length).to.equal(1);
  });

  it('should call preventDefault when i click on create button', ()=> {
      const stub = sinon.stub(); 
      const wrapper = mount(<CreateStudent />);
      wrapper.find('button').simulate('click', {preventDefault: stub});
      expect(stub.callCount).to.equal(1)
  });

  it('should NOT show error message when email is too short', ()=> {
      const wrapper = mount(<CreateStudent />);
      wrapper.find('input').get(0).value = 'sam@aol.com';
      wrapper.find('button').simulate('click');
      expect(wrapper.state('error')).to.be.null;
  });

  it('should show error message when email is too short', ()=> {
      const wrapper = mount(<CreateStudent />);
      wrapper.find('input').get(0).value = 'sam';
      wrapper.find('button').simulate('click');
      expect(wrapper.state('error')).to.equal('Email too short');
  });

  it('should create a student', (done)=> {
      nock("http://fakehost.com")
      .post('/students', {email:'sam@aol.com'})
      .reply(200, {id:99, email:'sam@aol.com'})

      const stub = sinon.stub();
      
      const wrapper = mount(<CreateStudent host="http://fakehost.com" created={stub}/>);
      
      wrapper.find('input').get(0).value = 'sam@aol.com';
      wrapper.find('button').simulate('click');
      
      setTimeout(() => {
          try{
            expect(stub.callCount).to.equal(1);
            expect(stub.getCall(0).args[0]).to.deep.equal({id:99, email:'sam@aol.com'})
            expect(wrapper.find('input').get(0).value).to.equal('');
            done();
        }catch(e){
            done.fail(e)
    }
      
      } ,1000);
      
});

it('should show server failure error', (done)=> {
      nock("http://fakehost.com")
      .post('/students', {email:'sam@aol.com'})
      .replyWithError('server just exploded');

      const stub = sinon.stub();
      
      const wrapper = mount(<CreateStudent host="http://fakehost.com" created={stub}/>);
      
      wrapper.find('input').get(0).value = 'sam@aol.com';
      wrapper.find('button').simulate('click');
      
      setTimeout(() => {
          try{
            expect(stub.callCount).to.equal(0);
            expect(wrapper.find('input').get(0).value).to.equal('sam@aol.com');
            expect(wrapper.state('error')).to.equal('server just exploded')
            done();
        }catch(e){
            done.fail(e)
    }
      
      } ,1000);
      
});
});