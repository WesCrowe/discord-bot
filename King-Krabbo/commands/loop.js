const { SlashCommandBuilder }             = require("@discordjs/builders")
const { useMainPlayer, QueueRepeatMode }  = require("discord-player")
const { EmbedBuilder, CommandOptionType } = require("discord.js")
const Language                            = require("../strings.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName(Language.loop.command)
    .setDescription(Language.loop.description)
    .addIntegerOption((option) => option.setName(Language.loop.command).setDescription(Language.loop.option)
        .addChoices(
                {name: 'queue', value: QueueRepeatMode.QUEUE},
                {name: 'song', value: QueueRepeatMode.TRACK},
                {name: 'off', value: QueueRepeatMode.OFF}
            )
        .setRequired(true))
    ,

    run: async ({ interaction }) => {
        const player = useMainPlayer()
        const queue = player.nodes.get(interaction.guildId)

        if (!queue){
            return await interaction.editReply(Language.queue.nosongs)
        } else {
            try{
                let loopMode = interaction.options.getInteger(Language.loop.command)
                /////////////////////
                //console.log(loopMode)
                /////////////////////
                queue.setRepeatMode(loopMode)
                const message = loopMode === QueueRepeatMode.QUEUE ? "queue" : loopMode === QueueRepeatMode.TRACK ? "song" : "stop"
                await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`loop mode has been set to **${message}**`)
                            .setColor("#d6c2ce")
                    ]
                })
            } catch (e) {
                return interaction.editReply(Language.system.error + e)
            }
        }
    }
}