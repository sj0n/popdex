import { describe, it, expect } from 'vitest';
import { titleCase } from '../libs/titleCase';
import { titleCaseMap } from '../libs/enumerateTitleCase';
import { ref } from 'vue';

describe.concurrent('Title Case', () => {
    it('should capitalize the first letter of a word', () => {
        const word = 'hello';
        expect(titleCase(word)).toEqual('Hello');
    })

    it('should capitalize the first letter of words with format: hello-world', () => {
        const word = 'hello-world';
        expect(titleCase(word)).toEqual('Hello World');
    })
})

describe('Convert value from array of objects or objects of array of objects to Title Case', () => {
    it('should capitalize the first letter of the word', async () => {
        const pokemon = ref({
            "ok": true,
            "response": {
              "types": [
                {
                  "type": {
                    "name": "electric",
                  }
                }
              ],
              "abilities": [
                {
                    "ability": {
                        "name": "thunder-punch"
                    }
                },
                {
                    "ability": {
                        "name": "headbutt"
                    }
                }
              ]
            }
          })
        expect(titleCaseMap(pokemon.value.response.types, 'type')).toEqual(['Electric'])
        expect(titleCaseMap(pokemon.value.response.abilities, 'ability')).toEqual(['Thunder Punch', 'Headbutt'])
    })
});