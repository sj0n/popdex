import { titleCase } from "@/libs/titleCase";

interface PokemonSpawnLocation {
    location_area: {
        name: string,
        url: string
    },
    version_details: VersionDetail[]
}

interface VersionDetail {
    encounter_details: [
        {
            chance: number,
            max_level: number,
            method: {
                name: string
            },
            min_level: number
        }
    ]
}

export default defineEventHandler(async (event) => {
    const name = getRouterParam(event, 'name');
    try {
        let areas = await $fetch<PokemonSpawnLocation[]>(`https://pokeapi.co/api/v2/pokemon/${name}/encounters`);
        areas = areas.map((data) => {
            let {
                location_area,
                version_details: [
                    {
                        encounter_details
                    }
                ]
            } = data;

            return { location_area, version_details: [{ encounter_details }] }
        });

        let grouped: any = {};
        areas.forEach(location => {
            const locationName = location.location_area.name;
            location.version_details.forEach(version => {
                version.encounter_details.forEach(encounter => {
                    // If the location already exists, update the min_level and max_level if necessary
                    if (grouped[locationName]) {
                        grouped[locationName].min_level = Math.min(grouped[locationName].min_level, encounter.min_level);
                        grouped[locationName].max_level = Math.max(grouped[locationName].max_level, encounter.max_level);
                    } else {
                        grouped[locationName] = {
                            location_name: titleCase(locationName),
                            min_level: encounter.min_level,
                            max_level: encounter.max_level,
                            method: encounter.method.name
                        };
                    }
                });
            });
        });

        return {
            ok: true,
            response: Object.values(grouped)
        }
    } catch (e) {
        if (e instanceof Error) {
            if (e.message.includes('Not Found')) {
                setResponseStatus(event, 404, e.message);
            } else if (e.message.includes('Forbidden')) {
                setResponseStatus(event, 403);
            } else if (e.message.includes('Bad Request')) {
                setResponseStatus(event, 400);
            } else {
                setResponseStatus(event, 500);
            }

            return {
                ok: false,
                message: e.message
            }
        } else {
            setResponseStatus(event, 500);
            return {
                ok: false,
                message: 'An error occured. Try again later.'
            }
        }
    }
});