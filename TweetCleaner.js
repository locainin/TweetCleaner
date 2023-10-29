// Set your parameters
const swearWords = [
    //... (swear words here)
];
const waitTimeSeconds = 10;
const scrollWaitSeconds = 5;
const maxRetryCount = 10;

// Utility function to pause the script
const sleep = async (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

// Function to check if the text contains swear words
const containsSwearWords = (text) => {
    let detectedSwearWord = null;
    const hasSwearWord = swearWords.some(swearWord => {
        const isPresent = new RegExp(`\\b${swearWord}\\b`, 'i').test(text);
        if (isPresent) detectedSwearWord = swearWord;
        return isPresent;
    });
    return { hasSwearWord, detectedSwearWord };
};

// Function to delete a tweet
const deleteTweet = async (tweet, swearWord) => {
    try {
        console.log('Trying to delete a post');
        const moreOptionsButton = tweet.querySelector('div[data-testid="caret"]');
        if (moreOptionsButton) {
            moreOptionsButton.click();
            await sleep(2); // wait for the menu to appear
            const deleteButton = [...document.querySelectorAll('div[role="menuitem"]')].find(el => el.textContent.includes('Delete'));
            if (deleteButton) {
                deleteButton.click();
                await sleep(2); // wait for the confirmation dialog
                const confirmButton = document.querySelector('div[data-testid="confirmationSheetConfirm"]');
                if (confirmButton) {
                    confirmButton.click();
                    console.log(`Deleted a post containing the swear word: "${swearWord}"`);
                } else {
                    console.log('Confirm button not found');
                }
            } else {
                console.log('Delete button not found');
            }
        } else {
            console.log('More options button not found');
        }
    } catch (e) {
        console.error('Error while trying to delete post:', e);
    }
};

// Main loop to process all tweets
const processTweets = async () => {
    try {
        const tweets = document.querySelectorAll('article');
        for (const tweet of tweets) {
            const tweetTextContainer = tweet.querySelector('div[dir="auto"]');
            if (tweetTextContainer) {
                const tweetText = tweetTextContainer.textContent;
                const { hasSwearWord, detectedSwearWord } = containsSwearWords(tweetText);
                if (hasSwearWord) {
                    console.log(`Swear word detected: "${tweetText}"`);
                    await deleteTweet(tweet, detectedSwearWord);
                    // break; // uncomment this if you want to stop after the first found instance
                }
            }
        }
        console.log('Done processing current tweets on page.');
    } catch (e) {
        console.error('Error while processing tweets:', e);
    }
};

// Function to keep the script running
const main = async () => {
    try {
        console.log('Starting script...');
        let retryCount = 0;
        while (true) {
            await processTweets();
            console.log('Scrolling for more tweets...');
            window.scrollTo(0, document.body.scrollHeight); // scroll to the bottom of the page
            await sleep(scrollWaitSeconds);
            retryCount++;

            if (retryCount > maxRetryCount) {
                console.log('Maximum retry count reached. Ending script.');
                break;
            }

            await sleep(waitTimeSeconds);
        }
    } catch (e) {
        console.error('Error in main function:', e);
    }
};

// Start the script
main();
