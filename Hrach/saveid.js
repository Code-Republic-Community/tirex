import redis from 'redis';

const client = redis.createClient();

client.on('connect', function() {
    console.log('Connected to Redis');
});

export function saveid(keyWord, objectIds) {

    for (let i = 0; i < objectIds.length; ++i) {
        if (objectIds[i] == null) {
            let index = objectIds.indexOf(objectIds[i]);
            objectIds.splice(index, 1);
            --i;
        }

    }
    console.log(objectIds.length);

    client.set(keyWord, objectIds.toString());
    console.log('Saved');



}