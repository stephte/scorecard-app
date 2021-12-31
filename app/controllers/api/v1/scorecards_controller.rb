module Api
  module V1
    class ScorecardsController < ApplicationController
      protect_from_forgery with: :null_session

      # card list to choose from
      def index
        scorecards = Scorecard.all

        render json: scorecards.to_json(only: [:id, :card_name])
      end

      # get scorecard
      def show
        scorecard = Scorecard.find(params[:id])

        render json: scorecard.jsonify
      end

      # save the card, return updated card
      def update
        scorecard = Scorecard.find(params[:id])

        if scorecard.update(scorecard_params)
          render json: scorecard.jsonify
        else
          render json: {error: scorecard.errors.message}, status: 422
        end
      end

      # takes in json with the course id, returns a new scorecard with one player pre-added
      def create
        scorecard = Scorecard.new("course_id" => params[:course_id])

        if scorecard.save
          render json: {id: scorecard.id}
        end
      end

      # delete scorecard
      def destroy
        scorecard = Scorecard.find(params[:id])

        if scorecard.destroy
          head :no_content
        else
          render json: {error: scorecard.errors.message}, status: 422
        end
      end

      private

      def scorecard_params
        params.permit(:id, :card_name, :course_id, players_attributes: [:id, :name, :_destroy, scores: []])
          # .require(:scorecard)
      end

    end
  end
end
