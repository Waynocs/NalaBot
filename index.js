const { prefix, BOT_TOKEN } = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();

//Annonce le bon fonctionnement du bot
client.once('ready', () => {
	console.log('Ready!');
});

//bot en mode "online" && statut perso
client.on('ready', async () =>{
    client.user.setStatus("online")
    client.user.setActivity("Sbotify", {type: 'LISTENING'})
});

client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //HELP COMMAND
    else if(command === 'help'){

            const exampleEmbed = {
                color: "FF00FB",
                title: 'Help',
                author: {
                    name: 'SERANO Waïan',
                    url: 'https://github.com/Waynocs',
                },
                description: 'Trouvez le code source du bot ici : [GitHub](https://github.com/Waynocs/NalaBot) \n Mon [Insta](https://www.instagram.com/waianserano/) :)',
                thumbnail: {
                    url: 'https://cdn.discordapp.com/avatars/310347657425977345/a_f80d256f7f5578336f5528d559f207e2.gif',
                },
                fields: [
                    {
                        name: `*${prefix}help*`,
                        value: 'Donne toutes les commandes du bot',
                    },
                    {
                        name: `*${prefix}pp*`,
                        value: 'Donne votre photo de profil discord actuelle',
                    },
                    {
                        name: `*${prefix}kick*`,
                        value: 'Fais genre que vous ejectez quelqu\'un',

                    },
                    {
                        name: `*${prefix}server*`,
                        value: 'Donne le nom du serveur dans lequel la commande est effectué',

                    },
                    {
                        name: `*${prefix}user-info*`,
                        value: 'Permet d\'afficher les infos de l\'utilisateur',

                    },

                    {
                        name: `*${prefix}clear*`,
                        value: 'Permet de supprimer les messages d\'un channel (de 1 à 99)',
                    },
                ],

            };
            message.channel.send({ embed: exampleEmbed });
    }

    //commande pour kick un utilisateur
    else if (command === 'kick') {
        if (!message.mentions.users.size) {
            return message.reply('vous devez taguer un utilisateur pour le kick !');
        }
        const taggedUser = message.mentions.users.first();

        message.channel.send(`Tu veux kick : ${taggedUser.username}`);
}
    //comande pour afficher ton avatar / celui d'un autre utilisateur 
    else if (command === 'pp') {
        const user = message.mentions.users.first() || message.author;
        const taggedUser = message.mentions.users.first();
        if (!message.mentions.users.size) {
            return message.channel.send(user.avatarURL(({ format: "png", dynamic: true })));
        }

        message.channel.send(taggedUser.avatarURL(({ format: "png", dynamic: true })));
    }
    //Commande indiquant le nom du serv sur lequel le message est posté
    else if (message.content === `${prefix}server`) {
        message.channel.send(`On est sur le serv : ${message.guild.name}`);
    }
    //Commande afficher nom d'utilisateur de l'auteur du message && son ID
    else if (message.content === `${prefix}user-info`) {
        message.channel.send(`Ton nom d'utilisateur est : ${message.author.username}\nTon ID est : ${message.author.id}`);
    }
    //Clear messages
    else if(message.content.startsWith(`${prefix}clear`)){
       
        if(message.member.hasPermission('MANAGE_MESSAGES')){
           
            let args = message.content.trim().split(/ +/g);

            if(args[1]){
                //NaN = Not a Number
                if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99 ){
                    message.delete();
                    message.channel.bulkDelete(args[1]);
                    message.channel.send(`Vous avez supprimé ${args[1]} message(s)`)

                } else {
                    message.channel.send("Vous devez indiquer une valeur entre 1 et 99")
                }
            } else {
                message.channel.send("Vous devez entrer un nombre")
            }
        } else {
            message.channel.send("Vous devez avoir les droits MANAGE_MESSAGES pour exécuter cette commande !")
        }
    }
});




client.login(BOT_TOKEN);