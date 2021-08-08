class Api::MembershipsController < ApplicationController


    def create
        @membership = Membership.new(membership_params)
        @membership.user_id = current_user.id

        if current_user.memberships.length >= 8
            render json: ["Free accounts can't join more than 8 servers :)", "#{params[:membership][:server_id]}"], status: 402
        elsif @membership.save
            render :show
        else
            render json: @membership.errors.full_messages, status: 422
        end
    end


    def destroy
        @membership = Membership.find_by(id: params[:id])
        @membership.destroy
        render json: {}
    end


    private
    def membership_params
        params.require(:membership).permit(:server_id)
    end

    
end