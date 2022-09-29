import { describe, it, expect } from 'vitest'
import Header from '../components/Header.vue'
import { screen, render } from '@testing-library/vue'

describe('Header component', () => {
    it('renders the header component', async () => {
        render(Header);
        const component = await screen.findByText('PopDex');

        expect(component.innerHTML).toBe('PopDex');
        expect(component.tagName).toBe('NUXTLINK');
    })
})