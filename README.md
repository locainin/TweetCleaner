# TweetCleaner
A script in the console to identify and delete tweets or replies containing specified phrases/words from a user's Twitter profile.

# INSTRUCTIONS:

    1.) Ensure you are logged into your Twitter account(Under 'Tweets', or 'Replies').
    2.) Add any phrases or words in a JSON format that you wish to check for in the 'swearWords' array in the script.
    3.) Now, open the Developer Console in your web browser:
       - Chrome: Right-click on the page, select 'Inspect', then go to the 'Console' tab.
       - Firefox: Right-click on the page, select 'Inspect Element', then go to the 'Console' tab.
    4.) Copy the entire script from the TweetCleaner.js file.
    5.) Paste the script into the console (the area where you see a blinking cursor) and hit 'Enter'.
    6.) The script will now automatically scroll through your tweets, check for any specified phrases or words, and delete any tweets that contain them.

# EXAMPLE:

const swearWords = [
 
 "word1", "word2", "phrase1"

];



# Warnings and Disclaimers:

This script was created for educational purposes and personal use only. Users are responsible for ensuring that their use of this script complies with Twitter's Terms of Service 

automating interactions with the platform or performing mass deletions, could be seen as abusive behavior by Twitter and result in account suspension.

Be aware of rate limits imposed by Twitter on interactions with their platform. Excessive interactions or deletions may trigger rate limiting or other protective measures by Twitter

This script has basic error handling. Unexpected situations or changes in Twitter's web structure may cause this script to fail or behave unexpectedly.
