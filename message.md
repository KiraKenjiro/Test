
# SORA - Self-Optimizing Response Algorithm Documentation

## Overview

SORA, which stands for Self-Optimizing Response Algorithm, is a AI designed for social media and social projects. It is programmed to independently generate content and efficiently manage various aspects of a streamer's activities throughout the year. 

Throughout the year-long project, Sora will begin streaming on her own Discord server, various other social media platforms and gradually adapt her schedule to better suit the preferences of the community she has built.

### Key Features: 

-  **Content Generation:** SORA is equipped with advanced algorithms that autonomously create content, making it an invaluable tool for content creators and streamers.
- **Community Engagement:** SORA interacts with the community, adapting its content to better suit the preferences of the audience it builds over time.
- **Automation:** SORA's extensive array of programs oversees all aspects of a streamer's yearly activities, reducing the need for manual intervention.
- **Adaptive Intelligence:** The AI makes real-time decisions related to speech generation, game selection, and daily activities, enhancing the quality of the streaming experience.

## Component Diagram

![SORA Component Diagram](https://lh7-us.googleusercontent.com/_2D-9QpFSEjziTdr2vXfx-GfekIaEg2YkiJimaxY2AUqMPYWDzSPuM139GbkSLmqE-PjdqAzWZduaiu18TVcRK3Gddu6PLszuJX20f34Hxpx21RdnxswN_fXSZM0b0KaVXotj9yOi4wE7_TEWNg2jwU)

The SORA program consists of several key components:

### Javascript  WebSocket Server
Think of it as the central hub that links together all the various components and modules of SORA. It facilitates communication among servers and algorithms, enabling the exchange of information and commands between modules. This section also manages dashboard web access, providing manual control to SORA staff and members in case of problems or scripted control needs.

### Processing Module

Within this module, there exist two sub-modules. In essence, this component constitutes SORA's cognitive ability, comprising an array of distinct AI models tailored to execute various functions within the broader program.

#### OpenAI Decision Processing

This submodule essentially serves as the driving force behind SORA. It houses a Large Language Model (LLM) that empowers SORA to engage in conversations, make real-time decisions, and perform various other functions. For instance, prior to SORA's live streams, depending on her schedule, she may choose which game to play. Alternatively, she can use polls to involve her Discord users in the decision-making process. SORA generates a selection of five games she's interested in playing, shares a poll on her Discord server, and draws inspiration from her viewers' preferences.

Furthermore, this submodule enables SORA to interact with viewers during live streams or on Discord. It processes user conversations, allowing SORA to determine when and how to respond, even if she is not explicitly mentioned in the conversation.

#### Image Recognition & Reaction

This module is supplied with just a video file. Its primary function is to employ AI in an attempt to discern the content and events occurring within the video, subsequently providing a descriptive paragraph elucidating the video's content.

### Output & API Processing

This module manages external third-party communications, primarily serving three key components: the Text-to-Speech,  Speech-to-Text module and all forms of engagement with social media platforms.

#### Text-to-Speech

This module receives the output from the Decision Processing module, which is then transformed into audible speech modelled after the voice of [insert person's name]. Once the text is input, the module generates the corresponding audio and seamlessly broadcasts it through a digital audio channel.

#### Speech-to-Text

The Speech-to-Text section remains in a continuous state of activity, constantly monitoring and processing information. Unlike other voice assistants, SORA doesn't rely on specific keywords or command phrases to trigger its responsiveness. Instead, SORA continuously listens and autonomously determines when to actively participate in a conversation.

### Application & Game Loading/Control Module

#### Application Loader

In simple terms, this function categorizes and tags applications along with their respective locations, allowing SORA to comprehend how to use them. This organization is essential to synchronize and access data stored in JSON or KV formats when required.

## Objectives

The ultimate objective of SORA is to attain full autonomy, allowing it to handle all aspects independently. The aim is to commence the program at the beginning of next year, enabling the VTuber to effortlessly create content.

## Sequential Request Chart

![Sequential Request Chart](image-link-here)

This chart represents the backend of the sequential request process. It outlines the step-by-step plan that SORA follows to fetch the right data.

## Control Panel

![Control Panel](image-link-here)

SORA has a control panel that allows for moderating and managing streams. In the future, it will enable collaboration with others for gaming sessions and stream management.

## Conclusion

SORA's capabilities and components make it a valuable tool for creating content and managing social media activities.

For more details or specific information about each component, please refer to the relevant sections above.

For images, replace 'image-link-here' with the actual image URLs.
