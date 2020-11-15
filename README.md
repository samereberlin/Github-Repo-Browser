# GithubRepoBrowser

GithubRepoBrowser is a simple React Native (iOS/Android) application to browser GitHub most starred repositories.

It was implemented for didactic reasons, therefore it is not yet ready for production (see [Next steps](#next-steps) section below).

The following video presents the basic usage:

[BasicUsage.mp4](BasicUsage.mp4)

## Instructions to run

It is a standard react-native project (created with `npx react-native init`), so the instructions are basically:
```
git clone https://github.com/samereberlin/GithubRepoBrowser.git
cd GithubRepoBrowser
npm i
cd ios
pod install
cd ..
npm start
npm run ios
npm run android
```

```
               ######                ######               
             ###     ####        ####     ###             
            ##          ###    ###          ##            
            ##             ####             ##            
            ##             ####             ##            
            ##           ##    ##           ##            
            ##         ###      ###         ##            
             ##  ########################  ##             
          ######    ###            ###    ######          
      ###     ##    ##              ##    ##     ###      
   ###         ## ###      ####      ### ##         ###   
  ##           ####      ########      ####           ##  
 ##             ###     ##########     ###             ## 
  ##           ####      ########      ####           ##  
   ###         ## ###      ####      ### ##         ###   
      ###     ##    ##              ##    ##     ###      
          ######    ###            ###    ######          
             ##  ########################  ##             
            ##         ###      ###         ##            
            ##           ##    ##           ##            
            ##             ####             ##            
            ##             ####             ##            
            ##          ###    ###          ##            
             ###     ####        ####     ###             
               ######                ######               
                                                          

                  Welcome to React Native!                
                 Learn once, write anywhere
```

## Next steps

The application still needs a lot of adjustments to reach the production level, and the list below presents the main/urgent needs according to my feeling...

- Improve error handing (since currently it prints log messages only).

- Improve details UI (since currently it is too much simple and ugly).

- Implement additional requests to fetch relevant repository info.

- Write unit-tests and end-to-end tests (at least to cover basic functionalities).

- Choose an i18n solution (currently it contains hard-coded english texts only).
