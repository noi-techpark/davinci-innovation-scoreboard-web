pipeline {
    agent {
        dockerfile {
            filename 'infrastructure/docker/dockerfile-node'
            additionalBuildArgs '--build-arg JENKINS_USER_ID=`id -u jenkins` --build-arg JENKINS_GROUP_ID=`id -g jenkins`'
        }
    }

    environment {
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')

        API = "https://api.innovation.davinci.bz.it/v1/"
        KEYCLOAK_CLIENT_ID = "davinci-innovation-scoreboard-web"
        KEYCLOAK_CALLBACK = "https://innovation.davinci.bz.it/callback"
        KEYCLOAK_AUTHORIZATION_URI = "https://auth.opendatahub.bz.it/auth/realms/noi/protocol/openid-connect/auth"
        KEYCLOAK_USERINFO_URI = "https://auth.opendatahub.bz.it/auth/realms/noi/protocol/openid-connect/userinfo"
        KEYCLOAK_ACCOUNT_URI = "https://auth.opendatahub.bz.it/auth/realms/noi/account"
    }

    stages {
        stage('Dependencies') {
            steps {
                sh 'yarn install'
            }
        }
        stage('Test') {
            steps {
                sh 'yarn run test'
            }
        }
        stage('Build') {
            steps {
                sh 'yarn run generate'
            }
        }
        stage('Upload') {
            steps {
                s3Upload(bucket: 'prod-innovation-web', acl: 'PublicRead', file: './dist')
            }
        }
    }
}
