pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "machindra7/password-manager:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Pulling code from Git..."
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node dependencies...'
                sh 'NODE_OPTIONS="--max-old-space-size=4096" npm install --legacy-peer-deps'
            }
        }

        stage('Build App') {
            steps {
                echo "Building React app..."
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                sh """
                    docker stop password-manager || true
                    docker rm password-manager || true
                    docker rmi -f $(docker images -q) || true
                """
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push ${DOCKER_IMAGE}
                    """
                }
            }
        }
        stage('Deploy Docker Container') {
            steps {
                echo "Deploying Docker container locally..."
                sh """
                    docker run -d -p 8081:80 -v ./public:/app/public -v ./src:/app/src --name password-manager machindra7/password-manager:latest
                """
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed!"
        }
    }
}
