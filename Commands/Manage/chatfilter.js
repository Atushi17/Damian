const { MessageEmbed, CommandInteraction, Client } = require("discord.js");
const Schema = require('../../Structures/Schema/filterap');
const sourcebin = require('sourcebin');

module.exports = {
    name: "chat-filter",
    description: "A simple chat filtering system.",
    permission: "MANAGE_MESSAGES",
    usage:'/chat-filter (configure/clear/list)',
    options: [
        {
            name: "clear",
            description: "Clear your blacklist",
            type: "SUB_COMMAND"
        },
        {
            name: "list",
            description: "list your blacklist",
            type: "SUB_COMMAND"
        },
        {
            name: "configure",
            description: "Add or remove words from the blacklist.",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "options",
                    description: "Select an option.",
                    type: "STRING",
                    required: true,
                    choices: [
                        { name: "Add", value: "add"},
                        { name: "Remove", value: "remove"},
                    ]
                },
                {
                    name:"words",
                    description: "Provide the word, add multiple by placing comma in between (word1,word2..etc)",
                    type: "STRING",
                    required: true
                }
            ]
        }
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute (interaction, client) {
        await interaction.deferReply();
        const { guild , options} = interaction;

        const subCommand = options.getSubcommand();

        switch(subCommand) {
            case "list":
                const Data = await Schema.findOne({Guild: guild.id})
                if(!Data) return interaction.editReply({content:'There is no data to list', ephemeral:true})

                await sourcebin.create([
                    {
                        content: `${Data.Words.map((w) => w).join("\n") || "none"}`,
                        language: "text",

                    }
                ],
                {
                    title: `${guild.name} | Blacklist`,
                    description: "All the Blacklisted words"
                }
                ).then((bin) => {
                    const res = new MessageEmbed()
                        .setAuthor({name: client.user.username, iconURL: client.user.avatarURL({format: "png"})})
                        .setDescription(`To check your Blacklist, Click [here](${bin.url})`)
                        .setFooter({text: `Requested by ${interaction.user.tag}`})
                        .setTimestamp()
                    interaction.editReply({embeds:[res]})
                })
                break;
            case "clear":
                await Schema.findOneAndUpdate({Guild: guild.id }, {Words: []})
                client.filters.set(guild.id , []);
                interaction.editReply({content:`Removed all the words from blacklist`});
                break;
            case "configure":
                const Choice = options.getString("options")
                const Words = options.getString("words").toLowerCase().split(",");

                switch (Choice) {
                    case "add":
                        Schema.findOne({Guild: guild.id}, async (err, data)=> {
                            if(err) throw err;
                            if(!data) {
                                await Schema.create({
                                    Guild: guild.id,
                                    Words: Words
                                });

                                client.filters.set(guild.id, Words);

                                return interaction.editReply({content: `Added ${Words.length} word(s) to the blacklist`})
                            }

                            const newWords = [];

                            Words.forEach((w) => {
                                if (data.Words.includes(w)) return;
                                newWords.push(w);
                                data.Words.push(w);
                                client.filters.get(guild.id).push(w);
                            })

                            interaction.editReply({content:`Added ${newWords.length} new word(s) to blacklist.`})

                            data.save();
                        })
                        break;
                
                    case "remove":
                        Schema.findOne({Guild: guild.id}, async (err, data)=> {
                            if(err) throw err;
                            if(!data) {
                                interaction.editReply({content:`There is no data to remove!`, ephemeral: true})
                            }

                            const removeWords = [];

                            Words.forEach((w) => {
                                if (!data.Words.includes(w)) return;
                                data.Words.remove(w);
                                removeWords.push(w);
                            })

                            const newArray = client.filters
                                .get(guild.id)
                                .filter((word) => !removeWords.includes(word));
                            
                            client.filters.set(guild.id, newArray);

                            interaction.editReply({
                                content:`Removed ${removeWords.length} word(s) from the blacklist.`
                            });

                            data.save();
                        })
                        break;
                }
                break
        }

    }
};
