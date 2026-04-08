import fs from 'fs';
import https from 'https';

const url = "https://docs.google.com/forms/d/e/1FAIpQLScqmNcepeDjuvU7ry_U-vG5vYVXg_lzdri0d58AiF6MGQuFNg/viewform";

https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        let str = data.split('var FB_PUBLIC_LOAD_DATA_ = ')[1];
        if (!str) return;
        str = str.split(';</script>')[0];
        const obj = JSON.parse(str);
        
        const items = obj[1][1];
        items.forEach(item => {
            const title = item[1];
            const entryId = item[4]?.[0]?.[0];
            if (entryId) {
               console.log(title + " -> entry." + entryId);
            }
        });
    });
});
