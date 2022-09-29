import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue';
import PokemonSearch from '../components/PokemonSearch.vue';

describe.concurrent('Homepage Pokemon Search component', async () => {
    it('renders the pokemon search component', async () => {
        render(PokemonSearch);
        const form = await screen.findByRole('form');
        const input = await screen.findByPlaceholderText(/Search a pokemon/i);
        expect(form.tagName).toBe('FORM');
        expect(input.tagName).toBe('INPUT');
    })

    it('form action attribute should update according to user input', async () => {
        render(PokemonSearch);
        const form = await screen.findByRole('form');
        const input = await screen.findByPlaceholderText(/Search a pokemon/i);

        await fireEvent.update(input, 'pikachu');
        expect(form.action).toBe('/pokemon/pikachu');
        await fireEvent.update(input, 'rayquaza');
        expect(form.action).toBe('/pokemon/rayquaza');
    })
})