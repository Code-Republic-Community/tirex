import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://search123:search123@bigdb.robcs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const URLSchema = new Schema({
    title: String,

    url: {
        type: String,
        required: true,
    },
    text: String,

    dateOfupdate: Date

})

const content = mongoose.model('content', URLSchema);

export async function find(word) {

    const docs = await content.find({}).exec();

    return docs.map((doc) => {
        if (doc.text.includes(word)) {
            //  console.log('Found');
            return doc.id;
        } else {
            return null;
        }
    });

}