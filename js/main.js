Vue.config.devtools = true;

const app = new Vue({
    el: '#root',
    data: {
        activeChat: '',
        activeAvatar: '',
        lastActivity: '',
        lastTime: '',
        newMessage: '',
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:53:00',
                        message: 'Ok come preferisci',
                        status: 'sent'
                    }
                ],
            },
        ]
    },
    methods: {
        lastMessage(e,i){
            let arrayMessage = this.contacts[i].messages;
            // console.log(this.contacts[i].messages[parseInt(this.contacts[i].messages.length - 1)].message);

            // console.log(arrayMessage[parseInt(arrayMessage.length - 1)].message);
            return arrayMessage[parseInt(arrayMessage.length - 1)].message
        },
        lastSeen(e,i){
            let userLastActivity = this.contacts[i].messages[parseInt(this.contacts[i].messages.length - 1)].date;
            this.lastTime = userLastActivity;
        },
        checkStatus(e,i){
            let statusMessage = this.contacts[i].messages;

            // console.log(statusMessage[parseInt(statusMessage.length - 1)].status)
            return statusMessage[parseInt(statusMessage.length - 1)].status
        },
        getUserName(e,i){
            let userName = this.contacts[i];
            this.activeChat = userName;
            // return activeChat
            let userAvatar = this.contacts[i];
            this.activeAvatar = userAvatar;

            let userLastActivity = this.contacts[i].messages[parseInt(this.contacts[i].messages.length - 1)].date;
            this.lastActivity = userLastActivity;
        },
        submitMessage(){

            let listMessages = this.activeChat.messages;

            let messageObject = {
                date: dayjs().date() + '/' + (dayjs().month() + 1) + '/' + dayjs().year() + '  ' + dayjs().hour() + ':' + dayjs().minute() + ':' + dayjs().second(),
                message: this.newMessage,
                status: 'sent',
            }

            if (this.newMessage != '') {
                listMessages.push(messageObject);
                this.newMessage = "";
            }

            setInterval(this.updateScroll, 100)
            setTimeout(this.receiveMessage, 1000);
        },
        updateScroll(){
            var element = document.getElementById("body-chat");
            element.scrollTop = element.scrollHeight - element.clientHeight
        },

        receiveMessage(){
            let listMessages = this.activeChat.messages;

            let newMessageReceived = {
                date: dayjs().date() + '/' + (dayjs().month() + 1) + '/' + dayjs().year() + '  ' + dayjs().hour() + ':' + dayjs().minute() + ':' + dayjs().second(),
                message: 'ok',
                status: 'received'
            }

            listMessages.push(newMessageReceived);
            
        }
        
    },
    mounted() {
        this.activeChat = this.contacts[0],
        this.lastActivity = this.contacts[0].messages[parseInt(this.contacts[0].messages.length - 1)].date

    },
})
