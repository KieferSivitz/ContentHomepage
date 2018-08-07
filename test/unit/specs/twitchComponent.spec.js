import twitchComponent from '../../../src/components/twitchComponent'
import { mount } from 'avoriaz';

describe('twitchComponent.vue', () => {
    it('should return 9 when multiplying 3 by 3', () => {
        expect(3 * 3).equal(9)
    });

    it('has a root element with text \'Change the channel:   ', () => {
        const wrapper = mount(twitchComponent);
        const p = wrapper.find('div')[0];
        expect(p.text()).to.equal('Change the channel:  ')
    });
})
