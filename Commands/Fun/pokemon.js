const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const fetch = require('node-fetch')
const BASE_URL = 'https://pokeapi.co/api/v2/'
const typedata = require('../../Functions/types.json')
const convert = require('convert-units')

module.exports = {
    name: 'pokedex',
    description: 'Searchs a pokemon by name or id',
    usage: "/pokedex <pokemon>",
    cooldown: 10000,
    options: [
        {
            name: "pokemon",
            description: "pokemon name or id",
            type: "STRING",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {

        const pokemon = interaction.options.getString('pokemon').toLowerCase()
        try {
            await fetch(`${BASE_URL}pokemon/${pokemon}`)
                .then(res => res.json())
                .then(body => {
                    let height = convert(body.height * 10).from('cm').to('ft-us').toFixed(1)
                    let weight = convert(body.weight * 0.1).from('kg').to('lb').toFixed(1)
                    const pokerep = new MessageEmbed()
                        .setColor("RANDOM")
                        .setFooter({text: `Requested by - ${interaction.user.username}`,iconURL:interaction.user.avatarURL()})
                        .setTitle(`${body.name.charAt(0).toUpperCase() + body.name.slice(1)} #${body.id}`)
                        .setThumbnail(body.sprites.other.home.front_default)
                        .setFields(
                            {
                                name: "Weight",
                                value: `${body.weight * 0.1} kg (${weight} lb)`
                            },
                            {
                                name: "Height",
                                value: `${height.toString().replace('.', 'ft ')}in (${body.height * 10} cm)`
                            },
                            {
                                name: "Base Experience",
                                value: `${body.base_experience}`
                            }
                        )

                    if (body.types.length === 1) {
                        pokerep.addField("Type(s)", `${typedata[body.types[0].type.name].emoji} - ${body.types[0].type.name.charAt(0).toUpperCase() + body.types[0].type.name.slice(1)}`)
                    }
                    if (body.types.length === 2) {
                        pokerep.addField("Type(s)", `${typedata[body.types[0].type.name].emoji} - ${body.types[0].type.name.charAt(0).toUpperCase() + body.types[0].type.name.slice(1)}\n${typedata[body.types[1].type.name].emoji} - ${body.types[1].type.name.charAt(0).toUpperCase() + body.types[1].type.name.slice(1)}`)
                    }
                    if (body.types.length === 3) {
                        pokerep.addField("Type(s)", `${typedata[body.types[0].type.name].emoji} - ${body.types[0].type.name.charAt(0).toUpperCase() + body.types[0].type.name.slice(1)}\n${typedata[body.types[1].type.name].emoji} - ${body.types[1].type.name.charAt(0).toUpperCase() + body.types[1].type.name.slice(1)}\n${typedata[body.types[2].type.name].emoji} - ${body.types[2].type.name.charAt(0).toUpperCase() + body.types[2].type.name.slice(1)}`)
                    }

                    pokerep.addField("Stats",
                        `Hp - ${body.stats[0].base_stat}
                Attack - ${body.stats[1].base_stat}
                Defense - ${body.stats[2].base_stat}
                Special-Attack - ${body.stats[3].base_stat}
                Special-Defence - ${body.stats[4].base_stat}
                Speed - ${body.stats[5].base_stat}`)

                    if (body.moves.length === 0) {
                        pokerep.addField("Moves[0]", `Sorry couldn't find data for Moves`)
                    }
                    else if (body.moves.length === 1) {
                        pokerep.addField("Moves[1]", `${body.moves[0].move.name}`)
                    }
                    else if (body.moves.length === 2) {
                        pokerep.addField("Moves[2]", `${body.moves[0].move.name},${body.moves[1].move.name}`)
                    }
                    else if (body.moves.length === 3) {
                        pokerep.addField("Moves[3]", `${body.moves[0].move.name},${body.moves[1].move.name},${body.moves[2].move.name}`)
                    }
                    else if (body.moves.length === 4) {
                        pokerep.addField("Moves[4]", `${body.moves[0].move.name},${body.moves[1].move.name},${body.moves[2].move.name},${body.moves[3].move.name}`)
                    }
                    else if (body.moves.length >= 5) {
                        pokerep.addField(`Moves[${body.moves.length}]`, `${body.moves[0].move.name},${body.moves[1].move.name},${body.moves[2].move.name},${body.moves[3].move.name},${body.moves[4].move.name}`)
                    }

                    if (body.abilities.length === 1) {
                        pokerep.addField("Abilities", `${body.abilities[0].ability.name}`)
                    }
                    if (body.abilities.length === 2) {
                        pokerep.addField("Abilities", `${body.abilities[0].ability.name}, ${body.abilities[1].ability.name}`)
                    }
                    if (body.abilities.length === 3) {
                        pokerep.addField("Abilities", `${body.abilities[0].ability.name}, ${body.abilities[1].ability.name}, ${body.abilities[2].ability.name}`)
                    }
                    interaction.reply({ embeds: [pokerep] })
                })
        } catch {
            interaction.reply({ content: "Entered Pokemon name or id is wrong.", ephemeral: true })
        }
    }
}