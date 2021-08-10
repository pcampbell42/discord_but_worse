class Api::DirectMessagesController < ApplicationController

    def show
        @direct_message = DirectMessage.find_by(id: params[:id])
        render "api/direct_messages/show_details"
    end

    def create
        @direct_message = DirectMessage.new(direct_message_params)
        if @direct_message.save
            render :show
        else
            render json: @direct_message.errors.full_messages, status: 422
        end
    end

    private
    def direct_message_params
        params.require(:direct_message).permit(:user1_id, :user2_id)
    end

end