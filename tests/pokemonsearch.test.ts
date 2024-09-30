import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/vue';
import PokemonSearch from '../components/PokemonSearch.vue';

describe.concurrent('Homepage Pokemon Search component', () => {
    it('renders the pokemon search component', async () => {
        render(PokemonSearch);
        
        const inputElement = await screen.findByLabelText('Pokemon Name');
        expect(inputElement.tagName).toBe('INPUT');
    });
    
    it('form action attribute should update according to user input', async () => {
        const form = document.getElementsByTagName('form')
        const inputElement = await screen.findByLabelText('Pokemon Name');
        await fireEvent.update(inputElement, 'pikachu');
        expect(form[0].action).toContain('/pokemon/pikachu');
        await fireEvent.update(inputElement, 'rayquaza');
        expect(form[0].action).toContain('/pokemon/rayquaza');
    });
});

cleanup();