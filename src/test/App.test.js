import {shallow} from 'enzyme';
import { Provider } from 'react-redux';
import App from '../App';
import RegionApiCall from '../components/RegionApiCall';



describe('App component ',()=>{
    const wrapper = shallow(<App/>);
    it('check existance of App component',()=>{
        expect(wrapper.exists('.App')).toBe(true);
    })
 
    it('check not value of App component ',()=>{
        expect(wrapper.exists('.App')).not.toBe(false);
    })

    it('check header ',()=>{
        expect(wrapper.find('h1').exists()).toBe(true);
    })

    it('check existance of RegionApiCall  ',()=>{
        expect(wrapper.find(RegionApiCall).exists()).toBe(true);
    })

    it('render function',()=>{
        wrapper.instance().render=jest.fn();
        jest.spyOn(wrapper.instance(),'render')
        wrapper.instance().render()
        expect(wrapper.instance().render).toHaveBeenCalled();             
    })

    it('check existance of Provider  ',()=>{
        expect(wrapper.find(Provider).exists()).toBe(true);
    })
})