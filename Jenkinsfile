pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                echo 'Cloning from GitHub...'
                git branch: 'main', url: 'https://github.com/krushnaadagale/todo-app.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images...'
                bat 'docker-compose build'
            }
        }

        stage('Run App') {
            steps {
                echo 'Stopping old containers if any...'
                bat 'docker-compose down'
                echo 'Starting all containers...'
                bat 'docker-compose up -d'
            }
        }

        stage('Done') {
            steps {
                echo 'App is live at http://localhost:3000'
            }
        }
    }
}
