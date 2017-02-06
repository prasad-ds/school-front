import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import Box from './Box';

import sinon from 'sinon';

describe('Box', () => {
    it('should render without error', () => {

        const wrapper = shallow(<Box />);
        expect(wrapper).to.be.ok;
    })

    it('should find component using its class name', () => {
        
        const wrapper = shallow(<Box />);
        expect(wrapper.find(".box").length).to.equal(1)
    });

    it('should get the text from component', () => {
        
        const wrapper = shallow(<Box text="alice@gmail.com" />);
        expect(wrapper.text()).to.equal("alice@gmail.com")
    });

    it('should get the class from component', () => {
        
        const wrapper = shallow(<Box css="selected"/>);
        const html = wrapper.html();
        console.log("html", html)
        expect(html).to.equal('<div class="box"><div class="selected"></div></div>');
        
    });

    it('should get the primary key (id) from component', () => {
        
        const wrapper = shallow(<Box id="3"/>);
        const html = wrapper.html();
        console.log("html", html)
        expect(html).to.equal('<div class="box"><div data-id="3"></div></div>');
        
    });

    it('should render out full component', () => {
        
        const wrapper = shallow(<Box css="empty" id="3" text="bob@aol.com"/>);
        const html = wrapper.html();
        console.log("html", html)
        expect(html).to.equal('<div class="box"><div data-id="3" class="empty">bob@aol.com</div></div>');
        
    });
    
    it('should call the parents fn when clicked', () => {
        const stub = sinon.stub();
        const wrapper = mount(<Box click={stub} />);
        wrapper.find('.box > div').simulate('click');
        expect(stub.callCount).to.equal(1)
        
    });
    
});
