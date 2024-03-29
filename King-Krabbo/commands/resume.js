const { SlashCommandBuilder }   = require("@discordjs/builders")
const { useMainPlayer }       = require("discord-player")
const Language                  = require("../strings.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName(Language.resume.command)
    .setDescription(Language.resume.description),
    run: async ({ interaction }) => {
        const player = useMainPlayer()
        const queue = player.nodes.get(interaction.guildId)

        if (!queue){
            return await interaction.editReply(Language.queue.nosongs)
        } else {
            try{
                queue.node.resume()
                await interaction.editReply(Language.resume.notify)
            } catch (e) {
                return interaction.editReply(Language.system.error + e)
            }
        }
    }
}